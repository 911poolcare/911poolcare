import { type NextRequest, NextResponse } from "next/server";
import { shouldDropBotTraffic } from "@/lib/security/traffic-filter";

/**
 * Block search engines from indexing Vercel preview URLs while you test.
 * Production (www.911poolcare.com) is unaffected.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const referrer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");

  // Drop known spoof/bot patterns before they pollute analytics reports.
  // Allowed crawlers (Googlebot, etc.) still pass; google.com referrer alone does not.
  if (shouldDropBotTraffic(referrer, userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  if (host.includes("vercel.app") || host.includes("localhost")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
