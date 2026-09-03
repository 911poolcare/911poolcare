/** How customers found 911 — labels must match Jobber client Lead Source text. */
export const referralSourceOptions = [
  { value: "returning-customer", label: "Returning Customer" },
  { value: "google", label: "Google" },
  { value: "ai", label: "AI (ChatGPT, Claude, etc.)" },
  { value: "saw-van", label: "Saw van / employee" },
  { value: "friend-family", label: "Friend / Family" },
  { value: "referral", label: "Referral" },
  { value: "partner", label: "Partner" },
  { value: "social-media", label: "Social Media" },
  { value: "other", label: "Other" },
] as const;

export type ReferralSourceValue = (typeof referralSourceOptions)[number]["value"];

/** Sources that collect a person or company name and write "Label - Name" to Jobber. */
export const namedLeadSourceValues = ["referral", "partner"] as const;

export type NamedLeadSourceValue = (typeof namedLeadSourceValues)[number];

export function isNamedLeadSource(
  value: string | undefined,
): value is NamedLeadSourceValue {
  return namedLeadSourceValues.includes(value as NamedLeadSourceValue);
}

export type LeadSourceFields = {
  referralSource?: string;
  referralSourceOther?: string;
  referrerName?: string;
};

export function getLeadSourceOptionLabel(value: string | undefined): string | null {
  if (!value) return null;
  return (
    referralSourceOptions.find((option) => option.value === value)?.label ?? null
  );
}

/** Value written to Jobber client Lead Source and request notes. */
export function formatLeadSourceLabel(data: LeadSourceFields): string | null {
  if (!data.referralSource) return null;

  const name = data.referrerName?.trim();
  if (data.referralSource === "partner") {
    return name ? `Partner - ${name}` : "Partner";
  }
  if (data.referralSource === "referral") {
    return name ? `Referral - ${name}` : "Referral";
  }
  if (data.referralSource === "other") {
    const detail = data.referralSourceOther?.trim();
    return detail ? `Other - ${detail}` : "Other";
  }

  return getLeadSourceOptionLabel(data.referralSource) ?? data.referralSource;
}

export const contactAttachmentLimits = {
  maxFiles: 6,
  maxFileSizeMb: 50,
  accept: "image/*,video/*",
} as const;
