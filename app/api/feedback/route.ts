import { NextRequest, NextResponse } from "next/server";

// Per-IP rate limit: 20 requests / 10 min. Occasional real feedback never hits this;
// it stops someone flooding the webhook. In-memory = per server instance.
const hits = new Map<string, number[]>();
function limited(ip: string, max: number) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (arr.length >= max) return true;
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "x").split(",")[0].trim();
  if (limited(ip, 20)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { message, email, technique } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const payload = {
    message: message.trim(),
    email: email || "anonymous",
    technique: technique || "unknown",
    timestamp: new Date().toISOString(),
  };

  // Forward to webhook if configured (Discord, Slack, Zapier, etc.)
  const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**New breathCult Feedback**\nTechnique: ${payload.technique}\nEmail: ${payload.email}\nMessage: ${payload.message}\nTime: ${payload.timestamp}`,
          // Discord-compatible format. Works with Slack/Zapier webhooks too.
          text: `New breathCult Feedback\nTechnique: ${payload.technique}\nEmail: ${payload.email}\nMessage: ${payload.message}`,
        }),
      });
    } catch (err) {
      console.error("Webhook delivery failed:", err);
    }
  } else {
    console.log("Feedback received (no webhook configured):", payload);
  }

  return NextResponse.json({ ok: true });
}
