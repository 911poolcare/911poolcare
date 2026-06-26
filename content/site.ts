import { poolCareOffering } from "@/content/service-offering";

export const site = {
  name: "911 Pool Care",
  tagline: poolCareOffering.tagline,
  description: poolCareOffering.metaDescription,
  phone: "512-947-2023",
  phoneHref: "tel:+15129472023",
  email: "office@911poolcare.com",
  veteranOwned: {
    label: "Veteran-Owned",
  },
  serviceScope: {
    label: "Residential & Commercial",
    description:
      "Homeowners, property managers, HOAs, apartment communities, and commercial properties across Central Texas.",
  },
  railCertified: {
    label: "RAIL Certified",
    description:
      "RAIL certification is required in Texas whenever electrical work is performed — including pool pumps, heaters, lights, and automation.",
  },
  google: {
    mapsUrl:
      "https://www.google.com/maps/place/911+Pool+Care/@30.2645554,-97.8352093,17z",
    /** Update periodically from your Google Business profile */
    rating: 4.9,
    reviewCount: 135,
  },
  address: {
    city: "Leander",
    state: "TX",
    zip: "78641",
    full: "Leander, TX 78641",
  },
  serviceAreas: [
    "Austin",
    "Leander",
    "Cedar Park",
    "Round Rock",
    "Georgetown",
    "Pflugerville",
    "Liberty Hill",
    "Jonestown",
    "San Marcos",
  ],
  trustSignals: [
    { label: "RAIL Certified", icon: "badge" as const },
    { label: "Licensed & Insured", icon: "shield" as const },
    { label: "Residential & Commercial", icon: "map" as const },
    { label: "Free Renovation Consults", icon: "calendar" as const },
  ],
  logo: {
    src: "/images/logos/logo.png",
    width: 446,
    height: 352,
  },
  hero: {
    src: "/images/hero/hero-main.jpg",
    alt: "Renovated swimming pool with spa and stone patio in Central Texas",
  },
  urls: {
    site: "https://www.911poolcare.com",
  },
} as const;

/** e.g. "4.9 · 135 Google reviews" — update `site.google` when your profile changes */
export function formatGoogleReviewsLabel(): string {
  const { rating, reviewCount } = site.google;
  return `${rating.toFixed(1)} · ${reviewCount.toLocaleString("en-US")} Google reviews`;
}
