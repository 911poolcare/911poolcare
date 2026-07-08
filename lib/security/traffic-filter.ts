const BLOCKED_REFERRER_HOSTS = [
  "atlas.taboolanews.com",
  "novel.juzdpinzklbz.online",
  "rotor.melinefy.com",
  "trends.glance.com",
] as const;

const KNOWN_BOT_USER_AGENT_SNIPPETS = [
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "blexbot",
  "crawler",
  "spider",
  "python-requests",
  "curl/",
  "wget/",
] as const;

const ALLOWED_REFERRER_HOSTS = [
  "google.com",
  "googleadservices.com",
  "doubleclick.net",
  "bing.com",
  "facebook.com",
  "instagram.com",
  "l.instagram.com",
  "t.co",
  "linkedin.com",
  "youtube.com",
] as const;

const ALLOWED_USER_AGENT_SNIPPETS = [
  "googlebot",
  "adsbot-google",
  "google-inspectiontool",
  "bingbot",
  "duckduckbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
] as const;

function parseHostFromUrl(value: string): string | null {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function isAllowedReferrer(referrer: string | null): boolean {
  if (!referrer) return false;
  const host = parseHostFromUrl(referrer);
  if (!host) return false;
  return ALLOWED_REFERRER_HOSTS.some(
    (allowedHost) => host === allowedHost || host.endsWith(`.${allowedHost}`),
  );
}

export function isAllowedUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const normalized = userAgent.toLowerCase();
  return ALLOWED_USER_AGENT_SNIPPETS.some((needle) =>
    normalized.includes(needle),
  );
}

export function isBlockedReferrer(referrer: string | null): boolean {
  if (!referrer) return false;
  const host = parseHostFromUrl(referrer);
  if (!host) return false;
  return BLOCKED_REFERRER_HOSTS.some(
    (blockedHost) => host === blockedHost || host.endsWith(`.${blockedHost}`),
  );
}

export function isKnownNonHumanUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const normalized = userAgent.toLowerCase();
  return KNOWN_BOT_USER_AGENT_SNIPPETS.some((needle) =>
    normalized.includes(needle),
  );
}
