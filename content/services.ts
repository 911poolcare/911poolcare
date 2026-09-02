import { poolEquipment } from "@/content/equipment";
import { serviceHeroImages } from "@/content/hero-images";
import { inspectionSeo } from "@/content/inspections";
import { leakDetectionSeo } from "@/content/leak-detection";
import { pricing } from "@/content/pricing";
import { renovationSeo } from "@/content/renovations";
import { primaryServiceSlugs } from "@/content/service-offering";
import { site } from "@/content/site";

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  headline: string;
  intro: string;
  highlights: string[];
  metaDescription: string;
};

export function isPrimaryService(slug: string): boolean {
  return (primaryServiceSlugs as Set<string>).has(slug);
}

export const services: Service[] = [
  {
    slug: "pool-leak-detection",
    title: "Pool Leak Repair & Detection",
    description:
      "Pool leak repair in Austin and Central Texas — Leaktronics & Anderson systems, dye testing, pressure testing, pipe cameras, then we complete the repair.",
    image: serviceHeroImages["pool-leak-detection"].src,
    imageAlt: serviceHeroImages["pool-leak-detection"].alt,
    headline: leakDetectionSeo.hubHeadline,
    intro:
      "Need pool leak repair in Austin or Greater Austin? We locate the source with dye testing, pressure testing, pipe cameras, and listening gear in and around the pool — then we complete the repair. Leaktronics and Anderson systems help us pinpoint plumbing, shell, and equipment leaks so you stop wasting water. Fair pricing and clear answers, every time.",
    highlights: [
      "Pool leak repair after we confirm the source — often the same visit",
      "Dye testing & pressure testing to locate all leak sources",
      "Pipe cameras, in-pool & out-of-pool listening devices, and locating gear",
      "Leaktronics and Anderson leak detection systems",
      `Transparent residential detection pricing from $${pricing.leakDetection.poolOnlySinglePump}`,
      `Residential guarantee: if we can't find the leak, pay only $${pricing.leakDetection.downPayment} down`,
    ],
    metaDescription:
      `Pool leak repair in Austin, TX — we find the leak with Leaktronics & Anderson systems, then complete the repair. Dye testing, pressure testing, pipe cameras. From $${pricing.leakDetection.poolOnlySinglePump}. Call 512-947-2023.`,
  },
  {
    slug: "pool-equipment-repair",
    title: poolEquipment.label,
    description: poolEquipment.shortDescription,
    image: serviceHeroImages["pool-equipment-repair"].src,
    imageAlt: serviceHeroImages["pool-equipment-repair"].alt,
    headline: "Pool equipment repair & replacement",
    intro:
      `Pumps, filters, heaters, automation, lights, and more — we diagnose, repair, and replace pool equipment for residential and commercial properties. ${site.raicLicensed.inline}. ${site.railCertified.inline}. Pump diagnostics are $120 and heater diagnostics are $150, each with a $50 credit toward repairs.`,
    highlights: [
      "Pump repair, diagnosis & replacement",
      "Filter repair & replacement",
      "Heater repair, diagnosis & replacement",
      "Automation & control system troubleshooting",
      "Pool light repair & replacement",
      site.raicLicensed.inline,
      site.railCertified.inline,
      "Pump diagnostic: $120 ($50 credit toward repairs)",
      "Heater diagnostic: $150 ($50 credit toward repairs)",
    ],
    metaDescription: poolEquipment.metaDescription,
  },
  {
    slug: "pool-renovations",
    title: "Pool Renovations & Replastering",
    description:
      "PebbleTec, MicroFusion, Stonescapes, Quartzscapes, marcite plaster, tile, coping, and full pool remodels. Free on-site consultation.",
    image: serviceHeroImages["pool-renovations"].src,
    imageAlt: serviceHeroImages["pool-renovations"].alt,
    headline: "Pool renovations & replastering in Austin, TX",
    intro:
      "Worn plaster, cracked coping, or a pool that looks tired? We replaster and remodel residential and commercial pools across Central Texas — PebbleTec, MicroFusion, Stonescapes, Quartzscapes, marcite, tile, and coping. Start with a free on-site consultation and a clear plan.",
    highlights: [
      "Free on-site renovation consultation — no pressure",
      "PebbleTec, MicroFusion, Stonescapes & Quartzscapes",
      "Basic marcite plaster and other finish options",
      "Waterline tile, coping, and trim updates",
      "Deck and hardscape coordination",
      "Full pool remodels — residential & commercial",
    ],
    metaDescription: renovationSeo.hubDescription,
  },
  {
    slug: "pool-inspections",
    title: "Pool Inspections",
    description:
      "Certified pool inspections with written reports and photo documentation for buyers, sellers, and realtors.",
    image: serviceHeroImages["pool-inspections"].src,
    imageAlt: serviceHeroImages["pool-inspections"].alt,
    headline: inspectionSeo.headline,
    intro: inspectionSeo.intro,
    highlights: [
      "Certified pool inspectors — not a general home inspection substitute",
      "Structure, plumbing, equipment, electrical, and safety evaluation",
      "Written report with photo documentation of findings",
      "$360 standard pool or pool/spa inspection (exclusions apply)",
      "Cold water add-on available when water is below 70°F",
    ],
    metaDescription: inspectionSeo.metaDescription,
  },
];

export const serviceOptions = [
  { value: "leak-detection", label: "Pool Leak Repair & Detection" },
  { value: "renovation", label: "Pool Renovation & Replastering" },
  { value: "equipment-repair", label: "Pool Equipment Repair & Replacement" },
  { value: "inspection", label: "Pool Inspection" },
  { value: "other", label: "Other / Not Sure" },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
