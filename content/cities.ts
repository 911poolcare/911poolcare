export type City = {
  slug: string;
  name: string;
  priority?: boolean;
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
  { slug: "san-marcos", name: "San Marcos" },
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
