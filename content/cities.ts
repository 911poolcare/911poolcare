export type City = {
  slug: string;
  name: string;
  priority?: boolean;
  /** When true, only pool renovation city pages are generated and linked */
  renovationsOnly?: boolean;
};

export const cities: City[] = [
  { slug: "austin", name: "Austin", priority: true },
  { slug: "georgetown", name: "Georgetown", priority: true },
  { slug: "leander", name: "Leander" },
  { slug: "cedar-park", name: "Cedar Park" },
  { slug: "round-rock", name: "Round Rock", priority: true },
  { slug: "pflugerville", name: "Pflugerville" },
  { slug: "manor", name: "Manor" },
  { slug: "liberty-hill", name: "Liberty Hill" },
  { slug: "jonestown", name: "Jonestown" },
  { slug: "lago-vista", name: "Lago Vista" },
  { slug: "spicewood", name: "Spicewood" },
  { slug: "lakeway", name: "Lakeway" },
  { slug: "westlake", name: "Westlake" },
  { slug: "dripping-springs", name: "Dripping Springs" },
  { slug: "san-marcos", name: "San Marcos" },
  { slug: "horseshoe-bay", name: "Horseshoe Bay", renovationsOnly: true },
];

export const priorityCities = cities.filter((city) => city.priority);

/** Cities tracked in SEO ranking reports — used for homepage links and hub expansion. */
export const trackedMarketSlugs = [
  "austin",
  "georgetown",
  "leander",
  "cedar-park",
  "round-rock",
  "pflugerville",
  "liberty-hill",
  "san-marcos",
] as const;

export const trackedMarketCities = cities.filter((city) =>
  (trackedMarketSlugs as readonly string[]).includes(city.slug),
);

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}

export function isPriorityCity(slug: string): boolean {
  return priorityCities.some((city) => city.slug === slug);
}

export function cityOffersService(city: City, serviceSlug: string): boolean {
  if (city.renovationsOnly) {
    return serviceSlug === "pool-renovations";
  }
  return true;
}

export function getCitiesForService(serviceSlug: string): City[] {
  return cities.filter((city) => cityOffersService(city, serviceSlug));
}

export function isRenovationsOnlyCity(slug: string): boolean {
  return getCityBySlug(slug)?.renovationsOnly === true;
}

/**
 * Nearby markets for internal linking — helps Google discover /areas/[city]
 * pages that are otherwise only reachable via the areas index or sitemap.
 */
const nearbyCitySlugs: Record<string, readonly string[]> = {
  austin: ["westlake", "lakeway", "cedar-park", "round-rock", "pflugerville", "manor"],
  georgetown: ["round-rock", "leander", "liberty-hill", "pflugerville"],
  leander: ["cedar-park", "liberty-hill", "georgetown", "jonestown", "lago-vista"],
  "cedar-park": ["leander", "austin", "round-rock", "liberty-hill"],
  "round-rock": ["georgetown", "pflugerville", "austin", "cedar-park"],
  pflugerville: ["austin", "round-rock", "manor", "georgetown"],
  manor: ["austin", "pflugerville", "round-rock"],
  "liberty-hill": ["leander", "georgetown", "cedar-park", "jonestown"],
  jonestown: ["leander", "lago-vista", "liberty-hill", "spicewood"],
  "lago-vista": ["jonestown", "lakeway", "spicewood", "leander"],
  spicewood: ["lakeway", "lago-vista", "dripping-springs", "horseshoe-bay"],
  lakeway: ["westlake", "austin", "spicewood", "lago-vista"],
  westlake: ["austin", "lakeway"],
  "dripping-springs": ["austin", "spicewood", "san-marcos"],
  "san-marcos": ["austin", "dripping-springs"],
  "horseshoe-bay": ["spicewood", "lakeway"],
};

export function getNearbyCities(citySlug: string, limit = 6): City[] {
  const slugs = nearbyCitySlugs[citySlug] ?? [];
  return slugs
    .map((slug) => getCityBySlug(slug))
    .filter((city): city is City => Boolean(city))
    .slice(0, limit);
}
