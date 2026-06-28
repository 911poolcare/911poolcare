/** Open Graph & social share images */

import { siteHero } from "@/content/hero-images";

export const defaultOpenGraphImage = {
  url: "/images/og/default.jpg",
  width: 1200,
  height: 630,
  alt: siteHero.alt,
} as const;

export const twitterCard = {
  card: "summary_large_image" as const,
  title: "Pool Leak Detection & Repair Austin TX | 911 Pool Care",
  description:
    "Central Texas pool leak detection, repairs, equipment replacement, renovations & inspections. 4.9★ rated. Call 512-947-2023.",
  images: [defaultOpenGraphImage.url],
};
