export const JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
export const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
export const JOBBER_AUTHORIZE_URL = "https://api.getjobber.com/api/oauth/authorize";

/** Pin a version — update when Jobber deprecates older versions. */
export const JOBBER_GRAPHQL_VERSION =
  process.env.JOBBER_GRAPHQL_VERSION ?? "2025-01-20";

export const JOBBER_LEAD_SOURCE = "911poolcare.com";

export function getJobberCredentials() {
  const clientId = process.env.JOBBER_CLIENT_ID;
  const clientSecret = process.env.JOBBER_CLIENT_SECRET;
  const refreshToken = process.env.JOBBER_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken };
}

export function isJobberConfigured(): boolean {
  return getJobberCredentials() !== null;
}
