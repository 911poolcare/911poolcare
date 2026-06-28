/** Hand-picked hero images from imported job photos */

export type HeroImage = {
  src: string;
  alt: string;
};

/** Homepage hero — rotates between finished results, renovation scale, and underwater expertise */
export const siteHeroGallery: HeroImage[] = [
  {
    src: "/images/jobs/pool-renovations/2024-06-24-p01.jpg",
    alt: "Renovated pebble-finish pool with sparkling blue water at a Central Texas home",
  },
  {
    src: "/images/jobs/pool-renovations/2024-11-13-p03.jpg",
    alt: "911 Pool Care crew applying new plaster on a luxury pool overlooking Lake Travis",
  },
  {
    src: "/images/jobs/team/2026-01-20-p01.jpg",
    alt: "911 Pool Care technician performing underwater pool leak detection in full dive gear",
  },
];

export const siteHero: HeroImage = siteHeroGallery[0];

export const serviceHeroImages: Record<string, HeroImage> = {
  "pool-leak-detection": {
    src: "/images/jobs/pool-leak-detection/2026-06-09-p02.jpg",
    alt: "Underwater dye testing to pinpoint a pool shell leak in Central Texas",
  },
  "pool-equipment-repair": {
    src: "/images/jobs/pool-equipment-repair/2025-07-05-p03.jpg",
    alt: "Pool equipment repair on a Pentair pump and filter system in Austin, Texas",
  },
  "pool-renovations": {
    src: "/images/jobs/pool-renovations/2024-11-13-p03.jpg",
    alt: "Professional pool replaster crew working on a luxury pool renovation in Central Texas",
  },
  "pool-inspections": {
    src: "/images/jobs/pool-inspections/2026-02-26-p01.jpg",
    alt: "Certified pool inspection with professional scuba equipment for underwater evaluation",
  },
};

export function getServiceHeroPick(serviceSlug: string): HeroImage | undefined {
  return serviceHeroImages[serviceSlug];
}
