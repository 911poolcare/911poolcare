export type CityHub = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  metaDescription: string;
  neighborhoods: string[];
  whyLocal: string[];
  responseTime: string;
  /** Hand-picked local job photo for the hub hero — real field work, not stock. */
  heroImage?: {
    src: string;
    alt: string;
  };
};

export const cityHubs: Record<string, CityHub> = {
  austin: {
    slug: "austin",
    name: "Austin",
    headline: "Austin pool leak detection, equipment, renovation & inspection",
    intro:
      "911 Pool Care brings leak detection technicians, pool repair experts, and renovation specialists to Austin — leak detection and repair, pool equipment repair and replacement, pool renovations and replaster, and certified inspections. Residential and commercial. We do not offer weekly pool cleaning.",
    metaDescription:
      "Leak detection technicians & pool repair experts in Austin, TX — equipment repair, renovations & replaster, inspections. Call 512-947-2023.",
    neighborhoods: [
      "Northwest Hills",
      "Westlake",
      "Steiner Ranch",
      "Circle C",
      "Mueller",
      "Tarrytown",
      "South Austin",
      "Allandale",
      "Barton Hills",
    ],
    whyLocal: [
      "Same-week appointments available across Austin",
      "Leak detection without unnecessary draining when possible",
      "Trusted by homeowners, HOAs, and Austin-area realtors",
      "Free renovation consultations — replaster, PebbleTec, tile & full remodels",
    ],
    responseTime: "Most Austin service calls scheduled within 3–5 business days",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/curated-austin-repair-after.jpg",
      alt: "Underground pool plumbing leak repaired in Austin, TX — 911 Pool Care leak detection and repair",
    },
  },
  georgetown: {
    slug: "georgetown",
    name: "Georgetown",
    headline: "Georgetown pool leak detection, equipment, renovation & inspection",
    intro:
      "Leak detection technicians, pool repair experts, and renovation specialists in Georgetown — leak detection and repair, equipment repair and replacement, pool renovations and replaster, and certified inspections. Serving Sun City, Wolf Ranch, and all of Georgetown. No weekly cleaning.",
    metaDescription:
      "Leak detection technicians & pool repair experts in Georgetown, TX — equipment, renovations & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Sun City",
      "Wolf Ranch",
      "Berry Creek",
      "Georgetown Village",
      "Old Town Georgetown",
      "Serenada",
      "La Cantera",
      "Cimarron Hills",
    ],
    whyLocal: [
      "Growing Georgetown team with fast response times",
      "Free renovation consultations for replaster and remodel projects",
      "Certified pool inspections for buyers and sellers",
      "Serving Sun City, Wolf Ranch, and all of Georgetown",
    ],
    responseTime: "Georgetown appointments often available same week",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-georgetown-deck-excavation.jpg",
      alt: "Pool deck excavation for underground leak repair in Georgetown, TX — 911 Pool Care leak detection",
    },
  },
  "round-rock": {
    slug: "round-rock",
    name: "Round Rock",
    headline: "Round Rock pool leak detection, equipment, renovation & inspection",
    intro:
      "911 Pool Care serves Round Rock homeowners and property managers with leak detection and repair, pool equipment repair and replacement, renovations and replaster, and certified inspections. From Teravista and Forest Creek to Old Town and Behren's Ranch, we help you fix leaks, failing equipment, and aging pool surfaces — without weekly cleaning services.",
    metaDescription:
      "Pool leak detection, repair & renovations in Round Rock, TX. Equipment repair, replaster & inspections. Veteran-owned. Call 512-947-2023.",
    neighborhoods: [
      "Teravista",
      "Forest Creek",
      "Behren's Ranch",
      "Old Town Round Rock",
      "Walsh Ranch",
      "Palm Valley",
      "Brushy Creek",
      "Siena",
    ],
    whyLocal: [
      "Leak detection for pools losing water in Round Rock's hot summers",
      "Equipment repair for pumps, heaters, filters, and automation",
      "Replaster, PebbleTec, and renovation consultations available",
      "Serving HOAs, backyard pools, and commercial properties",
    ],
    responseTime: "Most Round Rock service calls scheduled within 3–5 business days",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-round-rock-deck-excavation.jpg",
      alt: "Pool deck excavation for underground leak repair in Round Rock, TX — 911 Pool Care leak detection",
    },
  },
  "cedar-park": {
    slug: "cedar-park",
    name: "Cedar Park",
    headline: "Cedar Park pool leak detection, equipment, renovation & inspection",
    intro:
      "Cedar Park pools work hard every summer — and when you're losing water, equipment fails, or plaster is worn, 911 Pool Care can help. We provide leak detection and repair, equipment repair and replacement, pool renovations and replaster, and certified inspections throughout Avery Ranch, Buttercup Creek, Deer Creek, and surrounding Cedar Park neighborhoods.",
    metaDescription:
      "Pool leak detection, repair & renovations in Cedar Park, TX. Equipment repair, replaster & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Avery Ranch",
      "Buttercup Creek",
      "Ranch at Brushy Creek",
      "Deer Creek",
      "Lakeline",
      "Twin Creeks",
      "Anderson Mill West",
      "Cypress Canyon",
    ],
    whyLocal: [
      "Electronic leak detection for plumbing leaks under decks and patios",
      "Pump, heater, and filter diagnostics with repair credits",
      "Free renovation consultations for replaster and PebbleTec projects",
      "Trusted by Cedar Park homeowners and area realtors",
    ],
    responseTime: "Cedar Park appointments often available within the week",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-cedar-park-electronic-detection.jpg",
      alt: "Electronic pool leak detection at the pool edge in Cedar Park, TX — 911 Pool Care",
    },
  },
};

export function getCityHub(slug: string): CityHub | undefined {
  return cityHubs[slug];
}

export function getHubCitySlugs(): string[] {
  return Object.keys(cityHubs);
}

export function hasCityHub(slug: string): boolean {
  return slug in cityHubs;
}
