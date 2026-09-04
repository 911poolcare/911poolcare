import { type NextRequest, NextResponse } from "next/server";
import { resolveNestedWixServicePath } from "@/content/legacy-redirects";
import { site } from "@/content/site";
import { shouldDropBotTraffic } from "@/lib/security/traffic-filter";

const QUOTE_BUILDER_USER = process.env.QUOTE_BUILDER_USER;
const QUOTE_BUILDER_PASS = process.env.QUOTE_BUILDER_PASSWORD;

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="911 Pool Care Quote Builder"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function protectQuoteBuilder(request: NextRequest): NextResponse {
  if (!QUOTE_BUILDER_USER || !QUOTE_BUILDER_PASS) {
    return new NextResponse(
      "Quote builder auth is not configured. Set QUOTE_BUILDER_USER and QUOTE_BUILDER_PASSWORD.",
      { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
  }

  const basicAuth = request.headers.get("authorization");
  if (!basicAuth?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const encoded = basicAuth.slice(6);
    const decoded = atob(encoded);
    const separator = decoded.indexOf(":");
    if (separator === -1) return unauthorized();

    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);

    if (user === QUOTE_BUILDER_USER && password === QUOTE_BUILDER_PASS) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }
  } catch {
    return unauthorized();
  }

  return unauthorized();
}

/**
 * - Password-protect the internal renovation quote builder
 * - 301 nested Wix city URLs and non-www host
 * - Canonical hint for homepage tracking-parameter variants
 * - Drop scrapers that pollute analytics
 * - noindex Vercel preview / localhost
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/quote-builder.html") {
    return protectQuoteBuilder(request);
  }

  const nestedPath = resolveNestedWixServicePath(pathname);
  if (nestedPath) {
    const url = request.nextUrl.clone();
    url.pathname = nestedPath;
    return NextResponse.redirect(url, 308);
  }

  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  if (hostname === "911poolcare.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.911poolcare.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const host = request.headers.get("host") ?? "";
  const referrer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");

  if (shouldDropBotTraffic(referrer, userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  if (host.includes("vercel.app") || host.includes("localhost")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (pathname === "/" && request.nextUrl.searchParams.size > 0) {
    const response = NextResponse.next();
    response.headers.set("Link", `<${site.urls.site}>; rel="canonical"`);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
