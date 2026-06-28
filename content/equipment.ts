import { site } from "@/content/site";

/** Shared copy for pool equipment repair — pumps, filters, heaters, etc. */
export const poolEquipment = {
  label: "Pool Equipment Repair & Replacement",
  items: [
    "Pumps",
    "Filters",
    "Heaters",
    "Automation & control systems",
    "Pool lights",
    "Timers & electrical",
  ],
  inlineList: "pumps, filters, heaters, automation systems, lights, and more",
  shortDescription:
    "Repair and replacement for pool pumps, filters, heaters, automation, lights, and related equipment.",
  metaDescription:
    `Pool equipment repair & replacement in Central Texas — pumps, filters, heaters, automation, pool lights, and more. ${site.railCertified.label} (${site.railCertified.fullName}). Call 911 Pool Care.`,
} as const;

export function poolEquipmentPhrase(): string {
  return `pool equipment repair and replacement (${poolEquipment.inlineList})`;
}
