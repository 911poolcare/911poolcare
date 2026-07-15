/**
 * 301 redirects from legacy Wix URL paths to the new Next.js site.
 * Add entries here as you discover old indexed URLs in Google Search Console.
 */

import { cities, getCitiesForService } from "./cities";

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Wix often jammed multi-word cities onto the slug (cedarpark, not cedar-park). */
function jammedCitySlug(citySlug: string): string {
  return citySlug.replace(/-/g, "");
}

/**
 * Old Wix city service pages used patterns like:
 *   /services/{service}/{service}-{cityjam}
 *   /services/{service}/{service}-repair-{cityjam}
 *   /services/{service}-{cityjam}
 *   /services/{service}-repair-{cityjam}
 * All should land on /services/{service}/{city}.
 */
function wixCityServiceRedirects(
  serviceSlug: string,
  citySlug: string,
  middleParts: string[] = [""],
): LegacyRedirect[] {
  const destination = `/services/${serviceSlug}/${citySlug}`;
  const cityVariants = new Set([jammedCitySlug(citySlug), citySlug]);
  const redirects: LegacyRedirect[] = [];

  for (const cityPart of cityVariants) {
    for (const middle of middleParts) {
      const suffix = middle ? `${middle}-${cityPart}` : cityPart;
      redirects.push(
        {
          source: `/services/${serviceSlug}/${serviceSlug}-${suffix}`,
          destination,
          permanent: true,
        },
        {
          source: `/services/${serviceSlug}-${suffix}`,
          destination,
          permanent: true,
        },
      );
    }
  }

  return redirects;
}

const wixCityPageRedirects: LegacyRedirect[] = getCitiesForService(
  "pool-leak-detection",
).flatMap((city) =>
  wixCityServiceRedirects("pool-leak-detection", city.slug, ["", "repair"]),
);

/** /locations/{slug|jam} → /areas/{slug} */
const wixLocationRedirects: LegacyRedirect[] = cities.flatMap((city) => {
  const destination = `/areas/${city.slug}`;
  const variants = new Set([city.slug, jammedCitySlug(city.slug)]);
  return [...variants].map((part) => ({
    source: `/locations/${part}`,
    destination,
    permanent: true,
  }));
});

export const legacyRedirects: LegacyRedirect[] = [
  // Renamed service slugs
  {
    source: "/services/pool-renovation",
    destination: "/services/pool-renovations",
    permanent: true,
  },
  {
    source: "/services/pool-renovation/:path*",
    destination: "/services/pool-renovations/:path*",
    permanent: true,
  },
  {
    source: "/services/pool-repair",
    destination: "/services/pool-equipment-repair",
    permanent: true,
  },
  {
    source: "/services/pool-repair/:path*",
    destination: "/services/pool-equipment-repair/:path*",
    permanent: true,
  },

  // Common Wix page aliases
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/faq", destination: "/#faq", permanent: true },

  // Old marketing / anchor-style paths sometimes indexed on Wix
  { source: "/pool-leak-detection", destination: "/services/pool-leak-detection", permanent: true },
  { source: "/pool-renovation", destination: "/services/pool-renovations", permanent: true },
  { source: "/pool-renovations", destination: "/services/pool-renovations", permanent: true },
  { source: "/pool-repair", destination: "/services/pool-equipment-repair", permanent: true },
  { source: "/pool-inspections", destination: "/services/pool-inspections", permanent: true },
  { source: "/pool-inspection", destination: "/services/pool-inspections", permanent: true },

  // Discontinued services (no longer offered — send visitors to closest active service)
  {
    source: "/services/pool-tile-cleaning",
    destination: "/services/pool-renovations",
    permanent: true,
  },
  {
    source: "/post/pool-tile-cleaning-process",
    destination: "/services/pool-renovations",
    permanent: true,
  },
  {
    source: "/flood-response",
    destination: "/contact",
    permanent: true,
  },

  // Indexed Wix booking & process paths
  { source: "/book-now", destination: "/contact", permanent: true },
  { source: "/book-online", destination: "/contact", permanent: true },
  {
    source: "/leak-process",
    destination: "/services/pool-leak-detection",
    permanent: true,
  },
  { source: "/locations", destination: "/areas", permanent: true },
  ...wixLocationRedirects,

  // Wix city leak pages: /services/pool-leak-detection/pool-leak-detection-cedarpark → /cedar-park
  // also: .../pool-leak-detection-repair-austin → /austin
  ...wixCityPageRedirects,

  // Legacy Wix blog (no blog on new site yet)
  { source: "/blog", destination: "/services", permanent: true },
  { source: "/blog/:path*", destination: "/services", permanent: true },
  {
    source: "/post/pool-crack-repair-in-austin",
    destination: "/services/pool-leak-detection/austin",
    permanent: true,
  },
  { source: "/post/:slug", destination: "/services", permanent: true },

  // Wix policy page — add a /privacy page later if needed
  { source: "/privacy-policy", destination: "/", permanent: true },
];
