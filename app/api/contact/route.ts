import { NextResponse } from "next/server";
import { trackJobberRequest } from "@/lib/analytics/track-jobber-request";
import { readAdClickIdFromCookieHeader } from "@/lib/ads/click-id";
import { contactSchema } from "@/lib/validations/contact";
import { submitLeadToJobber } from "@/lib/jobber/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    // Honeypot triggered — pretend success to bots
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const adClick = readAdClickIdFromCookieHeader(request.headers.get("cookie"));
    console.info("[contact] ad click", adClick ? { source: adClick.source } : { source: null });
    const result = await submitLeadToJobber(parsed.data, adClick);
    await trackJobberRequest();

    return NextResponse.json({
      ok: true,
      requestId: result.requestId,
    });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Unable to submit right now. Please call us directly." },
      { status: 500 },
    );
  }
}
