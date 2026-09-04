export type CityHub = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  metaDescription: string;
  neighborhoods: string[];
  whyLocal: string[];
  responseTime: string;
  /** Extra unique copy so the hub is not just a service-card template. */
  localDetails?: {
    typicalPools: string;
    paragraphs: string[];
  };
  /** Hand-picked local job photo for the hub hero — real field work, not stock. */
  heroImage?: {
    src: string;
    alt: string;
  };
};

export const cityHubs: Record<string, CityHub> = {
  austin: {
    slug: "austin",
    name: "Austin",
    headline: "Austin pool leak repair, equipment, renovation & inspection",
    intro:
      "911 Pool Care provides pool leak repair in Austin — leak detection technicians find the source, then we complete the repair. We also handle pool equipment repair and replacement, pool renovations and replaster, and certified inspections. Residential and commercial. We do not offer weekly pool cleaning.",
    metaDescription:
      "Pool leak repair in Austin, TX — leak detection technicians, equipment repair, renovations & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Northwest Hills",
      "Westlake",
      "Steiner Ranch",
      "Circle C",
      "Mueller",
      "Tarrytown",
      "South Austin",
      "Allandale",
      "Barton Hills",
    ],
    whyLocal: [
      "Same-week appointments available across Austin",
      "Pool leak repair without unnecessary draining when possible",
      "Trusted by homeowners, HOAs, and Austin-area realtors",
      "Free renovation consultations — replaster, PebbleTec, tile & full remodels",
    ],
    responseTime: "Most Austin service calls scheduled within 3–5 business days",
    localDetails: {
      typicalPools:
        "Older gunite in Allandale, Barton Hills, Tarrytown, and Northwest Hills; 2000s–2020s production pools with spas and water features in Circle C, Steiner Ranch, and Mueller.",
      paragraphs: [
        "Austin is not one pool market. Hillside lots in Northwest Hills and Barton Hills hide plumbing under limestone and oak roots. Central 1970s–90s gunite still runs original PVC under later patio pours. Circle C, Steiner Ranch, and Mueller add spas, waterfalls, and longer equipment runs. Leak, equipment, renovation, and inspection work all change with that mix.",
        "Austin Water rates make a slow leak expensive, and the real-estate market makes a skipped pool inspection expensive in a different way. We schedule most Austin calls within 3–5 business days from our Leander shop — leak detection, equipment repair, replaster, and CPI-certified inspections, not weekly cleaning.",
      ],
    },
    heroImage: {
      src: "/images/jobs/pool-leak-detection/curated-austin-repair-after.jpg",
      alt: "Underground pool plumbing leak repaired in Austin, TX — 911 Pool Care leak detection and repair",
    },
  },
  georgetown: {
    slug: "georgetown",
    name: "Georgetown",
    headline: "Georgetown pool leak detection, equipment, renovation & inspection",
    intro:
      "Leak detection technicians, pool repair experts, and renovation specialists in Georgetown — leak detection and repair, equipment repair and replacement, pool renovations and replaster, and certified inspections. Serving Sun City, Wolf Ranch, and all of Georgetown. No weekly cleaning.",
    metaDescription:
      "Leak detection technicians & pool repair experts in Georgetown, TX — equipment, renovations & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Sun City",
      "Wolf Ranch",
      "Berry Creek",
      "Georgetown Village",
      "Old Town Georgetown",
      "Serenada",
      "La Cantera",
      "Cimarron Hills",
    ],
    whyLocal: [
      "Growing Georgetown team with fast response times",
      "Free renovation consultations for replaster and remodel projects",
      "Certified pool inspections for buyers and sellers",
      "Serving Sun City, Wolf Ranch, and all of Georgetown",
    ],
    responseTime: "Georgetown appointments often available same week",
    localDetails: {
      typicalPools:
        "Sun City and established Georgetown gunite from the 1990s–2000s with original plumbing and year-round use; newer Wolf Ranch and infill pools with spas, automation, and construction fittings.",
      paragraphs: [
        "Georgetown work splits between Sun City — retirement-community pools that run most of the year on 15–25-year-old equipment — and Wolf Ranch plus infill, where leaks and punch-list issues show up on much newer systems. Berry Creek, Serenada, and Old Town sit in between: established gunite, clay movement, and pads that have been in the weather since the original build.",
        "From Leander, Georgetown is a regular same-week route for leak detection, equipment repair, renovations, and certified inspections. HOA amenity pools and backyard jobs are both in scope; weekly cleaning is not.",
      ],
    },
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-georgetown-deck-excavation.jpg",
      alt: "Pool deck excavation for underground leak repair in Georgetown, TX — 911 Pool Care leak detection",
    },
  },
  "round-rock": {
    slug: "round-rock",
    name: "Round Rock",
    headline: "Round Rock pool leak detection, equipment, renovation & inspection",
    intro:
      "911 Pool Care serves Round Rock homeowners and property managers with leak detection and repair, pool equipment repair and replacement, renovations and replaster, and certified inspections. From Teravista and Forest Creek to Old Town and Behren's Ranch, we help you fix leaks, failing equipment, and aging pool surfaces — without weekly cleaning services.",
    metaDescription:
      "Pool leak detection, repair & renovations in Round Rock, TX. Equipment repair, replaster & inspections. Veteran-owned. Call 512-947-2023.",
    neighborhoods: [
      "Teravista",
      "Forest Creek",
      "Behren's Ranch",
      "Old Town Round Rock",
      "Walsh Ranch",
      "Palm Valley",
      "Brushy Creek",
      "Siena",
    ],
    whyLocal: [
      "Leak detection for pools losing water in Round Rock's hot summers",
      "Equipment repair for pumps, heaters, filters, and automation",
      "Replaster, PebbleTec, and renovation consultations available",
      "Serving HOAs, backyard pools, and commercial properties",
    ],
    responseTime: "Most Round Rock service calls scheduled within 3–5 business days",
    localDetails: {
      typicalPools:
        "Early-2000s subdivision gunite in Teravista, Forest Creek, and Palm Valley — many with in-floor cleaning — plus older Old Town shells and newer Siena and Walsh Ranch production pools.",
      paragraphs: [
        "Round Rock's 2000s building boom left thousands of backyard pools that are now in the leak, equipment-replacement, and replaster window. Teravista and Forest Creek in particular have a lot of in-floor cleaning systems, which means extra circuits to test when water is disappearing and extra finish details when it is time to resurface.",
        "Family use is heavy all summer. When a pump, heater, or leak shows up in July, the pool is not optional. We handle leak detection, equipment repair, renovations, and inspections across Round Rock from Leander, typically within 3–5 business days.",
      ],
    },
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-round-rock-deck-excavation.jpg",
      alt: "Pool deck excavation for underground leak repair in Round Rock, TX — 911 Pool Care leak detection",
    },
  },
  "cedar-park": {
    slug: "cedar-park",
    name: "Cedar Park",
    headline: "Cedar Park pool leak detection, equipment, renovation & inspection",
    intro:
      "Cedar Park pools work hard every summer — and when you're losing water, equipment fails, or plaster is worn, 911 Pool Care can help. We provide leak detection and repair, equipment repair and replacement, pool renovations and replaster, and certified inspections throughout Avery Ranch, Buttercup Creek, Deer Creek, and surrounding Cedar Park neighborhoods.",
    metaDescription:
      "Pool leak detection, repair & renovations in Cedar Park, TX. Equipment repair, replaster & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Avery Ranch",
      "Buttercup Creek",
      "Ranch at Brushy Creek",
      "Deer Creek",
      "Lakeline",
      "Twin Creeks",
      "Anderson Mill West",
      "Cypress Canyon",
    ],
    whyLocal: [
      "Electronic leak detection for plumbing leaks under decks and patios",
      "Pump, heater, and filter diagnostics with repair credits",
      "Free renovation consultations for replaster and PebbleTec projects",
      "Trusted by Cedar Park homeowners and area realtors",
    ],
    responseTime: "Cedar Park appointments often available within the week",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-cedar-park-electronic-detection.jpg",
      alt: "Electronic pool leak detection at the pool edge in Cedar Park, TX — 911 Pool Care",
    },
  },
  pflugerville: {
    slug: "pflugerville",
    name: "Pflugerville",
    headline: "Pflugerville pool leak detection, equipment, renovation & inspection",
    intro:
      "Pflugerville pools — from Blackhawk and Avalon to established backyard systems — develop plumbing and shell leaks over time, plus equipment wear from long Central Texas summers. 911 Pool Care provides leak detection and repair, equipment repair and replacement, renovations and replaster, and certified inspections. No weekly cleaning.",
    metaDescription:
      "Pool leak detection, repair & renovations in Pflugerville, TX. Equipment repair, replaster & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Blackhawk",
      "Avalon",
      "Falcon Pointe",
      "Heatherwilde",
      "Springbrook",
      "Villages of Hidden Lake",
      "Cambridge Heights",
      "Brookfield",
    ],
    whyLocal: [
      "Leakalyzer water-loss checks before a full detection",
      "Underground plumbing leaks located under decks and landscaping",
      "Free renovation consultations for replaster and PebbleTec projects",
      "Serving Pflugerville homeowners, HOAs, and nearby Travis County pools",
    ],
    responseTime: "Most Pflugerville appointments scheduled within 3–5 business days",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-pflugerville-underground-line.jpg",
      alt: "Underground pool plumbing line exposed for leak repair in Pflugerville, TX — 911 Pool Care",
    },
  },
  "liberty-hill": {
    slug: "liberty-hill",
    name: "Liberty Hill",
    headline: "Liberty Hill pool leak detection, equipment, renovation & inspection",
    intro:
      "Liberty Hill's growth means more pools on larger lots — and longer plumbing runs that hide leaks under rock, decking, and landscaping. We serve Liberty Hill with leak detection and repair, equipment repair and replacement, renovations and replaster, and certified inspections. Technicians and renovation specialists — not a cleaning route.",
    metaDescription:
      "Pool leak detection, repair & renovations in Liberty Hill, TX. Equipment repair, replaster & inspections. Call 512-947-2023.",
    neighborhoods: [
      "Santa Rita Ranch",
      "Liberty Hill Ranch",
      "Summerlyn",
      "Orchard Ridge",
      "Stonewall Ranch",
      "Downtown Liberty Hill",
      "Ronald Reagan corridor",
      "Highway 29 area",
    ],
    whyLocal: [
      "Electronic listening for long underground plumbing runs",
      "Dye testing and dive work when the job needs it",
      "Free renovation consultations for aging plaster and coping",
      "Convenient from our Leander base for fast Liberty Hill response",
    ],
    responseTime: "Liberty Hill appointments often available same week",
    heroImage: {
      src: "/images/jobs/pool-leak-detection/field-liberty-hill-diver-underwater.jpg",
      alt: "Underwater pool leak inspection dive in Liberty Hill, TX — 911 Pool Care leak detection",
    },
  },
};

export function getCityHub(slug: string): CityHub | undefined {
  return cityHubs[slug];
}

export function getHubCitySlugs(): string[] {
  return Object.keys(cityHubs);
}

export function hasCityHub(slug: string): boolean {
  return slug in cityHubs;
}
