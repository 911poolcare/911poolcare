/**
 * 301 redirects from legacy Wix URL paths to the new Next.js site.
 * Add entries here as you discover old indexed URLs in Google Search Console.
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

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
  { source: "/contact", destination: "/#contact", permanent: true },
  { source: "/contact-us", destination: "/#contact", permanent: true },
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
    destination: "/#contact",
    permanent: true,
  },

  // Indexed Wix booking & location paths
  { source: "/book-now", destination: "/#contact", permanent: true },
  { source: "/book-online", destination: "/#contact", permanent: true },
  { source: "/locations", destination: "/areas", permanent: true },
  { source: "/locations/leander", destination: "/areas/leander", permanent: true },
  { source: "/locations/sanmarcos", destination: "/areas/san-marcos", permanent: true },
  {
    source: "/services/pool-leak-detection-austin",
    destination: "/services/pool-leak-detection/austin",
    permanent: true,
  },
  {
    source: "/services/pool-leak-detection-georgetown",
    destination: "/services/pool-leak-detection/georgetown",
    permanent: true,
  },

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
