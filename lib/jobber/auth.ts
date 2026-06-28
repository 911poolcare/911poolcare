import {
  JOBBER_TOKEN_URL,
  getJobberCredentials,
} from "@/lib/jobber/config";

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
};

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

/**
 * Returns a valid Jobber access token, refreshing when needed.
 * If Jobber returns a new refresh token (rotation enabled), log it so you can
 * update JOBBER_REFRESH_TOKEN in Vercel.
 */
export async function getJobberAccessToken(): Promise<string> {
  const credentials = getJobberCredentials();
  if (!credentials) {
    throw new Error("Jobber credentials are not configured");
  }

  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    client_id: credentials.clientId,
    client_secret: credentials.clientSecret,
    grant_type: "refresh_token",
    refresh_token: credentials.refreshToken,
  });

  const response = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const payload = (await response.json()) as TokenResponse & {
    error?: string;
    error_description?: string;
  };

  if (!response.ok) {
    throw new Error(
      payload.error_description ??
        payload.error ??
        `Jobber token refresh failed (${response.status})`,
    );
  }

  if (!payload.access_token) {
    throw new Error("Jobber token refresh returned no access token");
  }

  if (
    payload.refresh_token &&
    payload.refresh_token !== credentials.refreshToken
  ) {
    console.warn(
      "[Jobber] Refresh token rotated. Update JOBBER_REFRESH_TOKEN in Vercel to:",
      payload.refresh_token,
    );
  }

  const expiresInMs = (payload.expires_in ?? 3600) * 1000;
  tokenCache = {
    accessToken: payload.access_token,
    expiresAt: now + expiresInMs,
  };

  return payload.access_token;
}
