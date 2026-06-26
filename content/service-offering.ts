/** Balanced full-service positioning — single source of truth for site copy */

export const poolCareOffering = {

  headline: "Complete pool care for Central Texas",

  subhead:

    "Leak detection and repair, equipment repair and replacement, pool renovations and replaster, and inspections for residential and commercial properties across Central Texas.",

  tagline: "Central Texas Pool Leak Detection, Equipment, Renovation & Inspection",

  metaDescription:

    "Full-service pool care in Austin and Central Texas — leak detection & repair, equipment repair & replacement, pool renovations & replaster, and inspections. RAIL certified. Veteran-owned.",

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


