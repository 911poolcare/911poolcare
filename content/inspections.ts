import { site } from "@/content/site";

export const inspectionSlug = "pool-inspections" as const;

export const inspectionAudience = [
  {
    title: "Homebuyers",
    description: "Purchasing a property with a pool and need an accurate condition report before closing.",
  },
  {
    title: "Home sellers",
    description: "Preparing for listing and want issues documented upfront — not discovered during escrow.",
  },
  {
    title: "Realtors",
    description: "Representing buyers or sellers who need a qualified pool specialist, not a guess.",
  },
  {
    title: "Investors",
    description: "Evaluating repair or renovation costs before committing to a property with a pool.",
  },
] as const;

export const inspectionAudienceNote =
  "If a pool is part of the property, it should be inspected by a qualified specialist — not guessed at during a general home inspection.";

export const inspectionChecks = [
  {
    title: "Pool structure & visible surface conditions",
    why: "Cracks, delamination, and surface wear can signal costly repairs or resurfacing — buyers and sellers need that clarity before closing.",
  },
  {
    title: "Pool plumbing & circulation systems",
    why: "Proper circulation affects water quality and equipment life. We look for signs of plumbing issues that a walkthrough would miss.",
  },
  {
    title: "Pumps, filters, heaters & automation",
    why: "Equipment replacement is often the biggest surprise cost in a pool transaction. We document what's working, what's aging, and what may need attention.",
  },
  {
    title: "Electrical & safety-related components",
    why: "Pool electrical work in Texas must meet code. We note safety-related concerns within the scope of a pool inspection so you're not caught off guard.",
  },
  {
    title: "Valves, fittings & visible leaks",
    why: "Active leaks and failing fittings lead to water loss and damage. Catching them early prevents expensive surprises after you own the property.",
  },
  {
    title: "Decking, coping, tile & surrounding areas",
    why: "Trip hazards, loose coping, and water intrusion at the pool edge affect safety and long-term repair costs — not just appearance.",
  },
  {
    title: "General operational & safety concerns",
    why: "We assess whether the pool appears fit for normal use and flag practical safety issues — with clear language, not alarmist notes.",
  },
] as const;

export const inspectionDeliverables = [
  "Up to 2 hours on-site inspection",
  "A clear, written inspection report",
  "Photo documentation of findings",
  "Prioritized notes on safety concerns and recommended repairs",
  "Practical guidance — not alarmist or vague language",
] as const;

export const inspectionDeliverablesGoal =
  "Our goal is to give you clarity, not create confusion or unnecessary panic.";

export const inspectionCertification = {
  title: "Certified pool inspector",
  description:
    "911 Pool Care inspections are performed by certified pool inspectors — not general contractors or visual-only walkthroughs. Certification ensures inspections follow professional standards and focus on real-world functionality, safety, and repair risk.",
} as const;

export const inspectionImportantNotes = [
  "Pool inspections are not the same as a general home inspection.",
  "Inspections focus on visible and accessible components.",
  "Some conditions may require further testing or specialty services.",
  "Leak detection and pressure testing are available separately if needed.",
  "If issues are discovered, we can clearly explain next steps and options — without pressure.",
] as const;

export const inspectionRelatedServices = [
  {
    label: "Pool leak detection & repair",
    slug: "pool-leak-detection",
    description: "When water loss or plumbing issues need specialist testing beyond the inspection scope.",
  },
  {
    label: "Pool equipment repair & replacement",
    slug: "pool-equipment-repair",
    description: "Pump, filter, heater, and pad repairs identified during the inspection.",
  },
  {
    label: "Pool renovations & replaster",
    slug: "pool-renovations",
    description: "Resurfacing, tile, coping, and remodel work when the inspection reveals renovation needs.",
  },
] as const;

export const inspectionPricing = {
  base: {
    label: "Standard pool or pool/spa inspection",
    price: 360,
    includes: [
      "Up to 2 hours on site",
      "Written inspection report",
      "Photo documentation",
      "Repair and safety recommendations",
    ],
    note: "Exclusions apply. Pricing reflects a professional, certified inspection — not a basic walkthrough. Additional time on site beyond 2 hours may be billed if required due to pool complexity or conditions.",
  },
  coldWaterAddOn: {
    label: "Cold water inspection add-on",
    price: 120,
    description:
      "Applies when water temperature is below 70°F. This fee ensures inspections are performed safely and thoroughly when colder water requires additional protective equipment and time.",
  },
} as const;

export const inspectionSeo = {
  headline: "Certified pool inspection services",
  intro:
    "Buying or selling a home with a pool? A certified pool inspection helps identify safety concerns, equipment issues, and costly repairs before closing. We provide professional, unbiased inspections throughout Central Texas with clear written reports you can trust.",
  subIntro:
    "Our inspections are performed by certified pool inspectors and are designed specifically for real estate transactions, homeowners, and investors who want an accurate assessment of a pool's condition.",
  metaDescription:
    "Certified pool inspections in Austin and Central Texas — $360 for a standard pool or pool/spa inspection (exclusions apply). Written report and photo documentation. Call 911 Pool Care.",
  ctaLabel: "Schedule a Pool Inspection",
  schedulingNote: `Based in ${site.address.city}, we perform certified pool inspections across Central Texas. Call ${site.phone} or request service to confirm availability.`,
} as const;
