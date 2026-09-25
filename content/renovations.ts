import { site } from "@/content/site";
import { pricing } from "@/content/pricing";
import { financing } from "@/content/financing";

export const renovationSlug = "pool-renovations" as const;

/** Pebble Tec / Pebble Sheen are applied only by certified manufacturer installers. */
export const renovationCertifiedInstallers =
  "Pebble Tec and Pebble Sheen finishes are applied only by certified Pebble Tec / Pebble Sheen installers — required for manufacturer warranty eligibility.";

/** Every renovation pool is leak-checked before a new surface goes in. */
export const renovationLeakCheckBeforePlaster =
  "We leak-check every pool before plaster or resurfacing. If we find a leak, we repair it first so the new finish is not sitting on a pool that still loses water.";

/** Pool surface materials we install — single source of truth */
export const renovationFinishesIntro =
  "We install Pebble Tec, Pebble Sheen, MicroFusion, Stonescapes, Quartzscapes, basic marcite plaster, and other materials for renovations and replasters. Pebble Tec and Pebble Sheen are applied only by certified installers.";

export const renovationFinishes = [
  {
    title: "Pebble Tec",
    description:
      "Durable pebble aggregate finish with natural texture — applied only by certified Pebble Tec installers so the manufacturer warranty stays valid.",
  },
  {
    title: "Pebble Sheen",
    description:
      "Smoother pebble finish with the durability of aggregate — applied only by certified Pebble Sheen installers.",
  },
  {
    title: "MicroFusion",
    description:
      "Refined pebble finish with a smoother feel underfoot while keeping the strength and color depth of aggregate surfaces.",
  },
  {
    title: "Stonescapes",
    description:
      "Blended pebble and glass-bead finish for rich color and a distinctive look on backyard and commercial pools.",
  },
  {
    title: "Quartzscapes",
    description:
      "Polished quartz aggregate for a smoother, shimmering surface — great when you want color without heavy texture.",
  },
  {
    title: "Basic marcite plaster",
    description:
      "Traditional marcite plaster for a clean, economical resurfacing when your pool needs a straightforward refresh.",
  },
  {
    title: "Other materials",
    description:
      "We can source and install other manufacturer finishes when they fit your pool, budget, and design goals.",
  },
] as const;

export const renovationSeo = {
  title: "Pool Renovation & Replastering | Central Texas",
  titleTemplate: (city: string) => `Pool Renovation ${city} TX | Replaster & Coping`,
  hubDescription:
    "We leak-check every pool before plaster. Then Pebble Tec and Pebble Sheen by certified installers, other premium finishes, tile, coping, and full remodels in Austin and Central Texas. Free on-site consultation. Call 512-947-2023.",
} as const;

export const renovationSpotlightHeadline =
  "We leak-check every pool before we plaster";

export const renovationSpotlightCards = [
  "Leak-check before every plaster",
  "Replaster & resurfacing",
  "Pebble Tec & Pebble Sheen",
  "Tile, coping & full remodels",
] as const;

export const renovationInstallerBadges = [
  "Certified Pebble Tec installers",
  "Certified Pebble Sheen installers",
  "Manufacturer warranty eligibility",
  "Leak-check before plaster",
] as const;

export const finishTypes = [
  {
    title: "Replaster & resurfacing",
    description:
      "Restore worn, stained, or delaminating plaster with a fresh surface. Every pool is leak-checked before we plaster or resurface.",
  },
  {
    title: "Pebble Tec & premium finishes",
    description:
      "Pebble Tec and Pebble Sheen applied only by certified installers, plus MicroFusion, Stonescapes, Quartzscapes, and other surfaces — we'll help you choose the right material for your pool, budget, and how you use it.",
  },
  {
    title: "Tile & coping repair",
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
      "Chris, your renovation project manager, assesses your pool's condition, discusses finish options, and explains what a renovation would involve — no pressure.",
  },
  {
    step: "2",
    title: "Leak check, then a written scope",
    description:
      "We leak-check every pool before plaster. You then get a straightforward plan covering surface work, tile, coping, equipment updates, and timeline — with one point of contact through the project.",
  },
  {
    step: "3",
    title: "Professional execution",
    description:
      "Prep, resurfacing, tile, and finishing details. Pebble Tec and Pebble Sheen are applied only by certified installers so manufacturer warranty stays valid. Chris stays your project manager for updates and quality control.",
  },
  {
    step: "4",
    title: "Ready for the season",
    description:
      "Walk the finished project with us, get care guidance, and enjoy a pool that looks and performs like new.",
  },
] as const;

/** Named quality checklist — trust signal for renovation pages */
export const renovationQualityChecklist = {
  eyebrow: "Quality checklist",
  title: "Our renovation quality checklist",
  description:
    "Every replaster and remodel is managed by Chris as your dedicated project manager — with clear communication and a consistent quality process from start to finish.",
  items: [
    "On-site consultation and finish recommendation",
    "Leak-check every pool before plaster or resurfacing",
    "Written scope covering surface, tile, coping, and related work",
    "Surface prep and substrate checks before new finish",
    "Pebble Tec / Pebble Sheen applied only by certified installers",
    "Tile, coping, and waterline detail quality review",
    "Mid-project updates from your project manager",
    "Final walkthrough and care guidance before handoff",
  ],
} as const;

export const renovationFaqs = [
  {
    question: "How do I know if my pool needs replastering?",
    answer:
      "Common signs include rough or stained plaster, visible rebar spots, peeling or delaminating surfaces, persistent staining that won't clean off, and pools that are 10–20+ years old. If you're unsure, our free renovation consultation is the best place to start.",
  },
  {
    question: "What pool finishes do you install?",
    answer: `${renovationFinishesIntro} We also handle tile, coping, and full remodels — and we'll recommend the right option based on your pool's condition, budget, and how you use it.`,
  },
  {
    question: "Are you a certified Pebble Tec installer?",
    answer: renovationCertifiedInstallers,
  },
  {
    question: "Do you leak-check a pool before replastering?",
    answer: renovationLeakCheckBeforePlaster,
  },
  {
    question: "Do you offer free renovation consultations?",
    answer: pricing.renovation.consultationDescription,
  },
  {
    question: "Do you offer financing for pool renovations?",
    answer: financing.faqAnswer,
  },
  {
    question: "Who manages my renovation project?",
    answer:
      "Chris, our General Manager, is your dedicated renovation project manager — from the free on-site consultation through final walkthrough. You get one point of contact for scope, updates, and quality control.",
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
  "lago-vista":
    "Lago Vista and Lake Travis hillside pools benefit from replaster, PebbleTec, and tile updates after years of sun and water exposure. We provide free renovation consultations in the area.",
  westlake:
    "Westlake hillside pools sit on sloped, wooded lots with limestone, rockwork, and mature trees. We handle replaster, PebbleTec, spa, and full remodel work throughout Westlake and nearby Austin — with free on-site consultations.",
  "dripping-springs":
    "Dripping Springs pools — from Hill Country estates to neighborhood backyards — are prime candidates for replaster, PebbleTec, and full renovation projects.",
  "san-marcos":
    "San Marcos homeowners and property managers rely on us for pool replaster, PebbleTec, tile updates, and full renovation projects.",
  "horseshoe-bay":
    "Horseshoe Bay resort and lakefront properties often need high-end replaster, tile, and renovation work. We currently serve Horseshoe Bay for pool renovations and replaster projects.",
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
  "lago-vista":
    "Pool renovation & replastering in Lago Vista, TX. PebbleTec, tile, coping & full remodels. Free consultation. Call 512-947-2023.",
  westlake:
    "Pool renovation & replastering in Westlake, TX. PebbleTec, tile, spa & hillside remodels. Free consultation. Call 512-947-2023.",
  "dripping-springs":
    "Pool renovation & replastering in Dripping Springs, TX. Replaster, PebbleTec, tile & coping. Free on-site consultation. Call 512-947-2023.",
  "san-marcos":
    "Pool renovation & replastering in San Marcos, TX. Replaster, PebbleTec, tile & full remodels. Free consultation. Call 512-947-2023.",
  "horseshoe-bay":
    "Pool renovation & replastering in Horseshoe Bay, TX. PebbleTec, tile, coping & lakefront pool remodels. Free consultation. Call 512-947-2023.",
};

export const priorityRenovationMarkets = [
  { slug: "austin", name: "Austin" },
  { slug: "georgetown", name: "Georgetown" },
  { slug: "round-rock", name: "Round Rock" },
  { slug: "cedar-park", name: "Cedar Park" },
] as const;

/** Cities with a complete before / during / after renovation photo set. */
export const featuredRenovationCollageCities = [
  "austin",
  "cedar-park",
  "westlake",
] as const;

/** Hub page keeps the two original featured sets; Westlake has its own city page. */
export const hubRenovationCollageCities = ["austin", "cedar-park"] as const;

export const renovationCollageCopy = {
  eyebrow: "Before, during & after",
  hubTitle: "Austin and Cedar Park renovations, start to finish",
  hubDescription:
    "The same pool at each stage — neglected or worn, then resurfaced, then filled and finished. Not a mix of random job photos.",
  cityTitle: (city: string) => `${city} pool renovation — before, during & after`,
  cityDescription: (city: string) =>
    `One ${city} job photographed before we started, while the new finish went in, and after the pool was filled.`,
} as const;
