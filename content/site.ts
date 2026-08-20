import { poolCareOffering } from "@/content/service-offering";
import { texasLicensing } from "@/content/credentials";
import { siteHero } from "@/content/hero-images";

export const site = {
  name: "911 Pool Care",
  tagline: poolCareOffering.tagline,
  description: poolCareOffering.metaDescription,
  phone: "512-947-2023",
  phoneHref: "tel:+15129472023",
  smsNumber: "+15129472023",
  smsDefaultBody: "Hi, I have a question about my pool.",
  email: "office@911poolcare.com",
  veteranOwned: {
    label: "Veteran-Owned",
  },
  serviceScope: {
    label: "Residential & Commercial",
    description:
      "Homeowners, property managers, HOAs, apartment communities, and commercial properties across Central Texas.",
  },
  /** Individual installer license — Danielle is Installer of Record */
  railCertified: {
    label: texasLicensing.rail.shortLabel,
    fullName: texasLicensing.rail.fullName,
    description: texasLicensing.rail.description,
    inline: texasLicensing.rail.inline,
    number: texasLicensing.rail.number,
    displayNumber: texasLicensing.rail.displayNumber,
  },
  /** Company contractor license — 911 Pool Care LLC */
  raicLicensed: {
    label: `${texasLicensing.raic.label} ${texasLicensing.raic.displayNumber}`,
    shortLabel: texasLicensing.raic.shortLabel,
    fullName: texasLicensing.raic.fullName,
    number: texasLicensing.raic.number,
    displayNumber: texasLicensing.raic.displayNumber,
    description: texasLicensing.raic.description,
    inline: texasLicensing.raic.inline,
    verifyUrl: texasLicensing.raic.verifyUrl,
  },
  google: {
    mapsUrl: "https://maps.app.goo.gl/rNdHB9BWzMFnPkyq6",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Leander,+TX+78641&z=10&output=embed",
    /** Leander area centroid — not a public street address */
    coordinates: {
      lat: 30.5788,
      lng: -97.8531,
    },
    /** Update periodically from your Google Business profile */
    rating: 4.9,
    reviewCount: 138,
  },
  address: {
    city: "Leander",
    state: "TX",
    zip: "78641",
    /** Public-facing — no street address (mobile service area business) */
    display: "Leander, TX · Central Texas",
  },
  openingHours: ["Mo-Fr 07:00-18:00", "Sa 09:00-17:00", "Su Closed"],
  priceRange: "$$",
  social: {
    facebook: "https://www.facebook.com/911poolcare",
    instagram: "https://www.instagram.com/911poolcare",
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
    { label: "RAIC #1545", icon: "badge" as const },
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
