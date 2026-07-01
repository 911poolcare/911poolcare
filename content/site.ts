import { poolCareOffering } from "@/content/service-offering";
import { siteHero } from "@/content/hero-images";

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
    fullName: "Residential Appliance Installer License",
    description:
      "RAIL — Residential Appliance Installer License — is the Texas standard required whenever electrical work is performed on pool equipment, including pumps, heaters, lights, and automation.",
    inline:
      "RAIL certified (Residential Appliance Installer License) for Texas pool electrical work",
  },
  google: {
    mapsUrl: "https://maps.app.goo.gl/rNdHB9BWzMFnPkyq6",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=911+Pool+Care,+Leander,+TX+78641&z=11&output=embed",
    coordinates: {
      lat: 30.2645554,
      lng: -97.8352093,
    },
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
    "Georgetown",
    "Leander",
    "Cedar Park",
    "Round Rock",
    "Pflugerville",
    "Liberty Hill",
    "Jonestown",
    "Lago Vista",
    "Dripping Springs",
    "San Marcos",
    "Horseshoe Bay",
  ],
  trustSignals: [
    { label: "RAIL Certified", icon: "badge" as const },
    { label: "Licensed & Insured", icon: "shield" as const },
    { label: "Residential & Commercial", icon: "map" as const },
    { label: "Free Renovation Consults", icon: "calendar" as const },
  ],
  logo: {
    src: "/images/logos/logo.png",
    width: 500,
    height: 500,
  },
  logoLight: {
    src: "/images/logos/logo-white.png",
    width: 500,
    height: 500,
  },
  hero: siteHero,
  urls: {
    site: "https://www.911poolcare.com",
  },
} as const;

export function formatServiceAreaLabel(area: string): string {
  if (area === "Horseshoe Bay") return "Horseshoe Bay (renovations)";
  return area;
}

export function getServiceAreasDisplay(): string {
  return site.serviceAreas.map(formatServiceAreaLabel).join(" · ");
}

/** Sentence-style service scope copy — keeps acronyms like HOAs capitalized. */
export function formatServiceScopeDescriptionInline(): string {
  return site.serviceScope.description
    .toLowerCase()
    .replace(/\bhoas\b/g, "HOAs");
}

/** e.g. "4.9 · 135 Google reviews" — update `site.google` when your profile changes */
export function formatGoogleReviewsLabel(): string {
  const { rating, reviewCount } = site.google;
  return `${rating.toFixed(1)} · ${reviewCount.toLocaleString("en-US")} Google reviews`;
}
