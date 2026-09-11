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
    `Pool repair in Austin & Central Texas — pumps, filters, heaters, automation, lights & more. ${site.raicLicensed.shortLabel} · ${site.railCertified.label}. Fast diagnostics. Call 512-947-2023.`,
} as const;

export function poolEquipmentPhrase(): string {
  return `pool equipment repair and replacement (${poolEquipment.inlineList})`;
}

export const equipmentBrands = [
  "Pentair",
  "Hayward",
  "Jandy / Zodiac",
] as const;

export const equipmentFaqs = [
  {
    question: "Why is my pool pump so loud?",
    answer:
      "Screeching or grinding often means bearings are failing. Catching that early is usually a repair, not a full pump replacement. We diagnose the motor, seal, and impeller before recommending parts.",
  },
  {
    question: "My pool heater will not ignite. Can you fix it?",
    answer:
      "Yes. Ignition failures are common on gas heaters in Central Texas — igniters, gas valves, control boards, and airflow issues. The $150 heater diagnostic includes a $50 credit toward approved repairs.",
  },
  {
    question: "Do you replace salt chlorine generator cells?",
    answer:
      "Yes. We test output, inspect the cell, and replace worn cells when repair is not cost-effective. Salt systems are part of the same equipment visit as pumps, filters, and automation.",
  },
  {
    question: "Should I switch to a variable-speed pump?",
    answer:
      "Often yes on older single-speed pads. A correctly sized variable-speed pump can cut electricity use substantially and is a common upgrade when the existing motor is already due. We will say so if a repair still makes more sense.",
  },
  {
    question: "Can you repair pool automation if the panel is dead?",
    answer:
      "We troubleshoot timers, relays, load centers, and controllers (including common Pentair, Hayward, and Jandy systems). Danielle leads that electrical work as our RAIL-certified Installer of Record.",
  },
] as const;
