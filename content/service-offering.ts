/** Site positioning — single source of truth for marketing copy */
export const poolCareOffering = {
  /** SEO-focused H1 for homepage and local search */
  seoHeadline: "Pool Leak Detection & Repair · Austin, TX",
  headline: "We bring leaking, broken & aging pools back to life",
  subhead:
    "Central Texas experts in pool leak detection, repairs, equipment replacement and renovations for residential, commercial and HOA / community properties.",
  tagline: "Central Texas Pool Leak Detection, Repair, Renovation & Inspection",
  metaDescription:
    "Pool leak detection & repair in Austin, TX — 4.9★ rated. Equipment repair, renovations, replaster & inspections across Greater Austin. RAIL certified. Veteran-owned. Call 512-947-2023.",
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
