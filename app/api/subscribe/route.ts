import { NextRequest, NextResponse } from "next/server";

// Per-IP rate limit: 10 requests / 10 min. A real person subscribes once, so this
// never affects normal use; it stops someone scripting junk into the Beehiiv list.
// In-memory = per server instance (a speed bump, not a hard global wall).
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
  if (limited(ip, 10)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.warn("Beehiiv not configured. Email:", email);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false,
        utm_source: "breathcult_pacer",
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Beehiiv error:", text);
    return NextResponse.json(
      { error: "Could not subscribe. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
