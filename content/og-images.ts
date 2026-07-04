/** Open Graph & social share images */

import { siteHero } from "@/content/hero-images";
import { site } from "@/content/site";

export const defaultOpenGraphImage = {
  url: "/images/og/default.jpg",
  width: 1200,
  height: 630,
  alt: siteHero.alt,
} as const;

export const twitterCard = {
  card: "summary_large_image" as const,
  title: `${site.name} — Pool Repair & Renovation Experts in Central Texas`,
  description:
    "Central Texas pool leak detection, repairs, equipment replacement, renovations & inspections. 4.9★ rated. Call 512-947-2023.",
  images: [defaultOpenGraphImage.url],
};
