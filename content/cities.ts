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
  { slug: "round-rock", name: "Round Rock" },
  { slug: "pflugerville", name: "Pflugerville" },
  { slug: "liberty-hill", name: "Liberty Hill" },
  { slug: "jonestown", name: "Jonestown" },
  { slug: "lago-vista", name: "Lago Vista" },
  { slug: "dripping-springs", name: "Dripping Springs" },
  { slug: "san-marcos", name: "San Marcos" },
  { slug: "horseshoe-bay", name: "Horseshoe Bay", renovationsOnly: true },
];

export const priorityCities = cities.filter((city) => city.priority);

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
