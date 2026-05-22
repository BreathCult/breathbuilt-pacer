import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, email, technique } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
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
