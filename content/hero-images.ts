/** Hand-picked hero images from imported job photos */

export type HeroImage = {
  src: string;
  alt: string;
  href?: string;
  label?: string;
};

/** Homepage hero — one slide per core service */
export const siteHeroGallery: HeroImage[] = [
  {
    src: "/images/hero/carousel-leak-detection.png",
    alt: "Pool leak detection and repair on a spa in Central Texas",
    href: "/services/pool-leak-detection",
    label: "Leak detection & repair",
  },
  {
    src: "/images/hero/carousel-equipment-repair.png",
    alt: "Pool equipment and electrical panel repair by 911 Pool Care",
    href: "/services/pool-equipment-repair",
    label: "Equipment repair",
  },
  {
    src: "/images/hero/carousel-renovations.png",
    alt: "Pool renovation crew applying new plaster finish in Central Texas",
    href: "/services/pool-renovations",
    label: "Renovations & replaster",
  },
  {
    src: "/images/hero/carousel-inspections.jpg",
    alt: "Certified pool inspection with professional scuba equipment",
    href: "/services/pool-inspections",
    label: "Pool inspections",
  },
];

export const siteHero: HeroImage = siteHeroGallery[0];

export const serviceHeroImages: Record<string, HeroImage> = {
  "pool-leak-detection": {
    src: "/images/hero/carousel-leak-detection.png",
    alt: "Pool leak detection and repair on a spa in Central Texas",
  },
  "pool-equipment-repair": {
    src: "/images/hero/carousel-equipment-repair.png",
    alt: "Pool equipment and electrical panel repair by 911 Pool Care",
  },
  "pool-renovations": {
    src: "/images/hero/carousel-renovations.png",
    alt: "Pool renovation crew applying new plaster finish in Central Texas",
  },
  "pool-inspections": {
    src: "/images/hero/carousel-inspections.jpg",
    alt: "Certified pool inspection with professional scuba equipment for underwater evaluation",
  },
};

export function getServiceHeroPick(serviceSlug: string): HeroImage | undefined {
  return serviceHeroImages[serviceSlug];
}
