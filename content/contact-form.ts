export const referralSourceOptions = [
  { value: "google-search", label: "Google search" },
  { value: "google-maps", label: "Google Maps / Reviews" },
  { value: "referral", label: "Friend, family, or neighbor" },
  { value: "realtor", label: "Realtor or property manager" },
  { value: "pool-partner", label: "Another pool company" },
  { value: "social-media", label: "Facebook / Instagram / social media" },
  { value: "yard-sign", label: "Yard sign or truck" },
  { value: "angi", label: "Angi / HomeAdvisor" },
  { value: "repeat", label: "I've used 911 Pool Care before" },
  { value: "other", label: "Other" },
] as const;

export const contactAttachmentLimits = {
  maxFiles: 6,
  maxFileSizeMb: 50,
  accept: "image/*,video/*",
} as const;
