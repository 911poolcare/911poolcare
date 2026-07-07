import { site } from "@/content/site";

const TZ = "America/Chicago";

/** Flip `enabled` to false to remove text buttons site-wide. */
export const smsChatConfig = {
  enabled: true,
  /** Set to true after live testing to hide text outside business hours. */
  businessHoursOnly: false,
} as const;

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function getChicagoMinutes(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);

  return { day: weekdayIndex[weekday] ?? 0, minutes: hour * 60 + minute };
}

/** Matches site.openingHours: Mo–Fr 7–6, Sa 9–5, Su closed. */
export function isWithinBusinessHours(date = new Date()): boolean {
  const { day, minutes } = getChicagoMinutes(date);

  if (day === 0) return false;
  if (day === 6) return minutes >= 9 * 60 && minutes < 17 * 60;
  return minutes >= 7 * 60 && minutes < 18 * 60;
}

export function isSmsChatVisible(date = new Date()): boolean {
  if (!smsChatConfig.enabled) return false;
  if (!smsChatConfig.businessHoursOnly) return true;
  return isWithinBusinessHours(date);
}

export function formatSmsHref(body = site.smsDefaultBody): string {
  // encodeURIComponent uses %20 for spaces — iOS Messages treats + literally in sms: URLs.
  return `sms:${site.smsNumber}?body=${encodeURIComponent(body)}`;
}

export function parseSmsBodyFromHref(href: string): string {
  const match = href.match(/[?&]body=([^&]*)/i);
  if (!match?.[1]) return site.smsDefaultBody;
  return decodeURIComponent(match[1].replace(/\+/g, " "));
}
