import { NextResponse } from "next/server";
import { JOBBER_AUTHORIZE_URL } from "@/lib/jobber/config";

/**
 * Starts the Jobber OAuth flow for one-time token setup.
 * Requires JOBBER_CLIENT_ID in environment variables.
 */
export async function GET(request: Request) {
  const clientId = process.env.JOBBER_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Set JOBBER_CLIENT_ID in environment variables first.", {
      status: 500,
    });
  }

  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/jobber/callback`;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL(JOBBER_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);

  return NextResponse.redirect(authorizeUrl.toString());
}
