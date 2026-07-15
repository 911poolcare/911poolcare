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
  "bytespider",
  "petalbot",
  "yandexbot",
  "baiduspider",
  "gptbot",
  "claudebot",
  "anthropic-ai",
  "ccbot",
  "crawler",
  "spider",
  "headlesschrome",
  "phantomjs",
  "puppeteer",
  "playwright",
  "selenium",
  "python-requests",
  "httpclient",
  "go-http-client",
  "axios/",
  "node-fetch",
  "scrapy",
  "curl/",
  "wget/",
  "libwww",
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

/**
 * Desktop Linux browser traffic is almost never a real lead for this local
 * service business. Real search crawlers (Googlebot, etc.) identify themselves
 * and are allowlisted separately — including Linux-based Googlebot variants.
 */
export function isUnlikelyHumanDesktopLinux(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  if (!ua.includes("linux") || ua.includes("android")) return false;
  return (
    ua.includes("mozilla/") ||
    ua.includes("chrome/") ||
    ua.includes("firefox/") ||
    ua.includes("edg/")
  );
}

/**
 * Drop scrapers / spoof traffic that pollute analytics.
 * A google.com referrer alone no longer grants a free pass.
 */
export function shouldDropBotTraffic(
  referrer: string | null,
  userAgent: string | null,
): boolean {
  // Allow known good crawlers first (Googlebot often reports Linux).
  if (isAllowedUserAgent(userAgent)) return false;

  if (!userAgent?.trim()) return true;
  if (isKnownNonHumanUserAgent(userAgent)) return true;
  if (isBlockedReferrer(referrer)) return true;
  if (isUnlikelyHumanDesktopLinux(userAgent)) return true;

  return false;
}
