import { NextResponse } from "next/server";
import { JOBBER_TOKEN_URL } from "@/lib/jobber/config";

/**
 * One-time OAuth callback to obtain Jobber refresh tokens.
 *
 * 1. In Jobber Developer Center, set callback URL to:
 *    https://www.911poolcare.com/api/jobber/callback  (or your Vercel preview URL while testing)
 * 2. Visit /api/jobber/authorize to start the flow
 * 3. Copy the refresh token into Vercel as JOBBER_REFRESH_TOKEN
 */
export async function GET(request: Request) {
  const clientId = process.env.JOBBER_CLIENT_ID;
  const clientSecret = process.env.JOBBER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Set JOBBER_CLIENT_ID and JOBBER_CLIENT_SECRET in environment variables first.",
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new NextResponse(`Jobber authorization error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new NextResponse("Missing authorization code.", { status: 400 });
  }

  const redirectUri = `${url.origin}/api/jobber/callback`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const response = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const payload = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !payload.refresh_token) {
    return new NextResponse(
      payload.error_description ??
        payload.error ??
        "Token exchange failed. Check that the callback URL matches your Jobber app settings.",
      { status: 500 },
    );
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Jobber connected</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 20px; line-height: 1.5; }
      code, pre { background: #f4f4f5; border-radius: 8px; padding: 12px; display: block; overflow-x: auto; word-break: break-all; }
      h1 { font-size: 1.5rem; }
    </style>
  </head>
  <body>
    <h1>Jobber authorization successful</h1>
    <p>Add this value to Vercel → Settings → Environment Variables:</p>
    <p><strong>JOBBER_REFRESH_TOKEN</strong></p>
    <pre><code>${payload.refresh_token}</code></pre>
    <p>Access tokens expire in about ${payload.expires_in ?? 3600} seconds — the site refreshes them automatically using the refresh token.</p>
    <p>If refresh token rotation is enabled in Jobber, watch server logs after form submissions and update this value when Jobber rotates it.</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
