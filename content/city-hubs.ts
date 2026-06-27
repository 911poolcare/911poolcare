export type CityHub = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  metaDescription: string;
  neighborhoods: string[];
  whyLocal: string[];
  responseTime: string;
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
  },
};

export function getCityHub(slug: string): CityHub | undefined {
  return cityHubs[slug];
}
