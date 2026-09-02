export const AD_CLICK_ID_COOKIE = "_ad_click_id";
export const AD_CLICK_SOURCE_COOKIE = "_ad_click_source";
export const AD_CLICK_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

export const AD_CLICK_SOURCES = ["gclid", "gbraid", "wbraid"] as const;

export type AdClickSource = (typeof AD_CLICK_SOURCES)[number];

export type AdClickId = {
  value: string;
  source: AdClickSource;
};

const CLICK_ID_PATTERN = /^[A-Za-z0-9._~-]{1,255}$/;

function isAdClickSource(value: string): value is AdClickSource {
  return (AD_CLICK_SOURCES as readonly string[]).includes(value);
}

export function sanitizeClickId(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed || !CLICK_ID_PATTERN.test(trimmed)) {
    return null;
  }
  return trimmed;
}

export function readAdClickIdFromSearch(
  search: string | URLSearchParams,
): AdClickId | null {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;

  for (const source of AD_CLICK_SOURCES) {
    const value = sanitizeClickId(params.get(source));
    if (value) {
      return { value, source };
    }
  }

  return null;
}

function readCookieValue(
  cookieHeader: string | null | undefined,
  name: string,
): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    const key = part.slice(0, separator).trim();
    if (key !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return part.slice(separator + 1).trim();
    }
  }

  return null;
}

export function readAdClickIdFromCookieHeader(
  cookieHeader: string | null | undefined,
): AdClickId | null {
  const value = sanitizeClickId(
    readCookieValue(cookieHeader, AD_CLICK_ID_COOKIE),
  );
  if (!value) return null;

  const sourceRaw = readCookieValue(cookieHeader, AD_CLICK_SOURCE_COOKIE);
  const source = sourceRaw && isAdClickSource(sourceRaw) ? sourceRaw : "gclid";

  return { value, source };
}

export function buildAdClickCookieStrings(click: AdClickId): string[] {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const attrs = [
    `Max-Age=${AD_CLICK_MAX_AGE_SECONDS}`,
    "Path=/",
    "SameSite=Lax",
    ...(secure ? ["Secure"] : []),
  ].join("; ");

  return [
    `${AD_CLICK_ID_COOKIE}=${encodeURIComponent(click.value)}; ${attrs}`,
    `${AD_CLICK_SOURCE_COOKIE}=${encodeURIComponent(click.source)}; ${attrs}`,
  ];
}
