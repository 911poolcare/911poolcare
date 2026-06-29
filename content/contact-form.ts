/** How customers discovered 911 — focused on marketing channels, not referral sub-types. */
export const referralSourceOptions = [
  { value: "online-search", label: "Google or online search" },
  { value: "social-media", label: "Social media (Facebook, Instagram, etc.)" },
  { value: "truck-sign", label: "Saw our truck, van, or yard sign" },
  { value: "word-of-mouth", label: "Friend, neighbor, or word of mouth" },
  { value: "pool-company", label: "Referred by another pool company" },
  { value: "angi", label: "Angi / HomeAdvisor" },
  { value: "repeat", label: "I've used 911 Pool Care before" },
  { value: "other", label: "Other" },
] as const;

export const contactAttachmentLimits = {
  maxFiles: 6,
  maxFileSizeMb: 50,
  accept: "image/*,video/*",
} as const;
