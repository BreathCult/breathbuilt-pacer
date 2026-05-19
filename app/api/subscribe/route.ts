import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
        utm_source: "breathbuilt_pacer",
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
