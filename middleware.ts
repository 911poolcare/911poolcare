import { type NextRequest, NextResponse } from "next/server";

/**
 * Block search engines from indexing Vercel preview URLs while you test.
 * Production (www.911poolcare.com) is unaffected.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

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
