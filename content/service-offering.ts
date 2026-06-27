/** Site positioning — single source of truth for marketing copy */
export const poolCareOffering = {
  headline: "We bring leaking, broken & aging pools back to life",
  subhead:
    "Leak detection technicians, pool repair experts, and renovation specialists for residential and commercial properties across Central Texas.",
  tagline: "Central Texas Pool Leak Detection, Repair, Renovation & Inspection",
  metaDescription:
    "Leak detection technicians, pool repair experts, and renovation specialists in Austin and Central Texas — leak repair, equipment, replaster, and inspections. RAIL certified. Veteran-owned.",
  primary: [
    {
      label: "Pool leak detection & repair",
      slug: "pool-leak-detection",
    },
    {
      label: "Pool equipment repair & replacement",
      slug: "pool-equipment-repair",
    },
    {
      label: "Pool renovations & replaster",
      slug: "pool-renovations",
    },
    {
      label: "Pool inspections",
      slug: "pool-inspections",
      note: "Certified inspections for buyers, sellers, and realtors.",
    },
  ],
  /** Inline list for sentences */
  inlineList:
    "leak detection and repair, equipment repair and replacement, pool renovations and replaster, and pool inspections",
} as const;

export const primaryServiceSlugs = new Set(
  poolCareOffering.primary.map((s) => s.slug),
);
