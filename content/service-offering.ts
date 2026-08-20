/** Site positioning — single source of truth for marketing copy */
export const poolCareOffering = {
  /** SEO-focused H1 for homepage and local search */
  seoHeadline: "Pool Repair & Renovation Experts · Austin, TX",
  headline: "We bring leaking, broken & aging pools back to life",
  subhead:
    "Leak detection, equipment repair, renovations & inspections for residential, commercial & HOA properties.",
  tagline: "Central Texas Pool Leak Detection, Repair, Renovation & Inspection",
  metaDescription:
    "Pool repair near Austin, TX — leak detection, equipment repair, renovations & certified inspections. 4.9★ on Google · TDLR RAIC #1545 · RAIL certified · veteran-owned. Call 512-947-2023.",
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
  /** Services index / section heading — all four core services */
  servicesHeading:
    "Pool leak detection & repair · Equipment repair & replacement · Renovations & replaster · Pool inspections",
  servicesIndex: {
    title: "Pool Repair Services Austin TX",
    metaDescription:
      "Compare pool repair services in Austin & Central Texas — leak detection, equipment repair, renovations, and certified inspections. 4.9★ rated. Call 512-947-2023.",
  },
  contact: {
    title: "Contact & Schedule Pool Service",
    metaDescription:
      "Book pool leak detection, repair, renovation, or inspection service in Central Texas. Call 512-947-2023 or submit our online form — we respond fast, often same day.",
  },
} as const;

export const primaryServiceSlugs = new Set(
  poolCareOffering.primary.map((s) => s.slug),
);
