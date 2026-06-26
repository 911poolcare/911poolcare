import { site } from "@/content/site";
import { pricing } from "@/content/pricing";

export const renovationSlug = "pool-renovations" as const;

export const renovationSeo = {
  title: "Pool Renovation & Replastering Austin TX",
  titleTemplate: (city: string) => `Pool Renovation ${city} TX | Replaster & PebbleTec`,
  hubDescription:
    "Pool renovations and replastering across Central Texas — replaster, PebbleTec, tile, coping, and full remodels for residential and commercial properties. Free on-site consultation.",
} as const;

export const finishTypes = [
  {
    title: "Replaster & resurfacing",
    description:
      "Restore worn, stained, or delaminating plaster with a fresh surface built to handle Central Texas heat and heavy use.",
  },
  {
    title: "PebbleTec & aggregate finishes",
    description:
      "Durable, premium PebbleTec and pebble finishes that look great and hold up season after season.",
  },
  {
    title: "Tile & coping",
    description:
      "Update waterline tile, coping, and trim for a cleaner look and better long-term protection at the waterline.",
  },
  {
    title: "Deck & hardscape updates",
    description:
      "Coordinate deck repairs, resurfacing, and layout improvements as part of a full backyard pool remodel.",
  },
  {
    title: "Full pool remodels",
    description:
      "From surface-only refreshes to complete renovations — planning, execution, and clear communication throughout.",
  },
] as const;

export const renovationProcess = [
  {
    step: "1",
    title: "Free on-site consultation",
    description:
      "We assess your pool's condition, discuss finish options, and explain what a renovation would involve — no pressure.",
  },
  {
    step: "2",
    title: "Clear scope & quote",
    description:
      "You get a straightforward plan covering surface work, tile, coping, equipment updates, and timeline.",
  },
  {
    step: "3",
    title: "Professional execution",
    description:
      "Our crew handles prep, resurfacing, tile, and finishing details with residential and commercial projects in mind.",
  },
  {
    step: "4",
    title: "Ready for the season",
    description:
      "Walk the finished project with us, get care guidance, and enjoy a pool that looks and performs like new.",
  },
] as const;

export const renovationFaqs = [
  {
    question: "How do I know if my pool needs replastering?",
    answer:
      "Common signs include rough or stained plaster, visible rebar spots, peeling or delaminating surfaces, persistent staining that won't clean off, and pools that are 10–20+ years old. If you're unsure, our free renovation consultation is the best place to start.",
  },
  {
    question: "What pool finishes do you offer?",
    answer:
      "We handle traditional replaster, PebbleTec and aggregate finishes, tile and coping updates, and full remodels. We'll recommend the right option based on your pool's condition, budget, and how you use the pool.",
  },
  {
    question: "Do you offer free renovation consultations?",
    answer: pricing.renovation.consultationDescription,
  },
  {
    question: "Do you renovate commercial pools?",
    answer: `Yes. ${site.serviceScope.description} We handle HOA amenities, apartment communities, hotels, and other commercial pool renovation projects across Central Texas.`,
  },
] as const;

/** City-specific renovation intros for local SEO pages */
export const cityRenovationIntros: Record<string, string> = {
  austin:
    "Austin has thousands of pools built in the 1990s and 2000s that are prime candidates for replaster and PebbleTec renovations. From Westlake and Northwest Hills to Circle C and Steiner Ranch, we help homeowners transform aging pools before peak swim season.",
  georgetown:
    "Georgetown's rapid growth includes established neighborhoods like Sun City and Wolf Ranch with pools ready for resurfacing. We provide free renovation consultations and full replaster, tile, and remodel services throughout Georgetown.",
  leander:
    "Leander homeowners trust us for pool replaster, PebbleTec, and renovation projects — from surface refreshes to full backyard pool remodels.",
  "cedar-park":
    "Cedar Park pools see heavy summer use. When plaster is worn or tile needs updating, we deliver professional replaster, PebbleTec, and renovation work across Cedar Park.",
  "round-rock":
    "Round Rock pools — especially older backyard and community pools — benefit from expert replastering and renovation. We handle tile, coping, and full remodel projects.",
  pflugerville:
    "Pflugerville pool owners call us for replaster, PebbleTec finishes, and complete pool renovations with clear quotes and free on-site consultations.",
  "liberty-hill":
    "Liberty Hill's growing neighborhoods include pools that need resurfacing and updates. We provide renovation consultations and full replaster services.",
  jonestown:
    "Jonestown and Lake Travis area pools often need expert replaster and tile work after years of sun exposure. We handle renovations from consultation through completion.",
  "san-marcos":
    "San Marcos homeowners and property managers rely on us for pool replaster, PebbleTec, tile updates, and full renovation projects.",
};

/** Keyword-rich meta descriptions per city */
export const cityRenovationMeta: Record<string, string> = {
  austin:
    "Pool renovation & replastering in Austin, TX. PebbleTec, tile, coping & full remodels. Free consultation. Residential & commercial. Call 512-947-2023.",
  georgetown:
    "Pool renovation & replastering in Georgetown, TX. Replaster, PebbleTec, tile & coping. Free on-site consultation. Call 512-947-2023.",
  leander:
    "Pool replaster & renovation in Leander, TX. PebbleTec, tile, coping & full pool remodels. Free consultation. Call 512-947-2023.",
  "cedar-park":
    "Pool renovation & replastering in Cedar Park, TX. PebbleTec, tile, coping & resurfacing. Free consultation. Call 512-947-2023.",
  "round-rock":
    "Pool renovation & replastering in Round Rock, TX. Replaster, PebbleTec & full remodels. Free on-site consultation. Call 512-947-2023.",
  pflugerville:
    "Pool replaster & renovation in Pflugerville, TX. PebbleTec, tile, coping & pool remodels. Free consultation. Call 512-947-2023.",
  "liberty-hill":
    "Pool renovation & replastering in Liberty Hill, TX. PebbleTec, tile & full pool remodels. Free consultation. Call 512-947-2023.",
  jonestown:
    "Pool replaster & renovation in Jonestown, TX. PebbleTec, tile, coping & resurfacing. Free on-site consultation. Call 512-947-2023.",
  "san-marcos":
    "Pool renovation & replastering in San Marcos, TX. Replaster, PebbleTec, tile & full remodels. Free consultation. Call 512-947-2023.",
};

export const priorityRenovationMarkets = [
  { slug: "austin", name: "Austin" },
  { slug: "georgetown", name: "Georgetown" },
  { slug: "round-rock", name: "Round Rock" },
  { slug: "cedar-park", name: "Cedar Park" },
] as const;
