/** Leak detection credentials, equipment, and methods — single source of truth */

import { getCitiesForService } from "@/content/cities";
import { pricing } from "@/content/pricing";
import { site } from "@/content/site";

export const leakDetectionSlug = "pool-leak-detection" as const;

export const leakDetectionSeo = {
  title: "Pool Leak Repair Austin TX | Detection & Repair",
  titleTemplate: (city: string) =>
    city === "Austin"
      ? "Pool Leak Repair Austin TX | Plumbing, Shell & Equipment"
      : `Pool Leak Repair ${city} TX | Detection & Repair`,
  hubHeadline: "Pool leak repair in Austin & Central Texas",
  cityHeadline: (city: string) => `Pool leak repair in ${city}, TX`,
  keywords: [
    "pool leak repair Austin",
    "pool leak repair Austin TX",
    "swimming pool leak repair",
    "pool leak detection Austin",
    "pool plumbing leak repair",
  ],
} as const;

export const leakRepairTypes = [
  {
    title: "Plumbing & underground line repair",
    description:
      "We repair leaking suction, return, and spa lines under decks, rock, and landscaping. Electronic locating marks the exact spot so we open the right place — not the whole yard.",
  },
  {
    title: "Pool shell & crack repair",
    description:
      "Hairline cracks, fitting leaks, and shell damage waste water and can undermine the structure. After dye testing confirms the source, we repair the leak before it becomes a bigger renovation.",
  },
  {
    title: "Skimmer, light & fitting leaks",
    description:
      "Skimmers, returns, lights, and wall fittings are common leak points. We confirm them with dye testing, then repair or replace the fitting so the pool holds water again.",
  },
  {
    title: "Equipment pad leak repair",
    description:
      "Pumps, filters, valves, and heater connections leak at the pad too. We isolate equipment leaks from underground plumbing so you are not paying to dig when the fix is above ground.",
  },
] as const;

export const leakDetectionCertification = {
  title: "Leaktronics & Anderson leak detection",
  description:
    "911 Pool Care is leak detection certified through Leaktronics and equipped with both Leaktronics and Anderson leak detection systems — the industry leaders for training and professional locating gear. That combination means structured field methods and the right tools to find leaks no matter where they hide.",
} as const;

export const leakDetectionEquipmentBrands =
  "We use both Leaktronics and Anderson leak detection systems to pinpoint pool leaks — professional-grade listening gear, pressure testing, pipe cameras, and locating devices for shell, plumbing, and equipment leaks.";

export const leakDetectionPhilosophy =
  "We balance technology, training, and the art of leak detection — using dye testing, pressure testing, and electronic locating to find every source of water loss, not guesswork or unnecessary excavation.";

export const leakDetectionTools = [
  {
    title: "Dye testing",
    description:
      "Dye testing at lights, skimmers, returns, fittings, and cracks to visually confirm leak sources in and around the pool.",
  },
  {
    title: "Pressure & vacuum testing",
    description:
      "Pressure and vacuum testing on plumbing lines to isolate which circuit is leaking — and confirm where pressure drops or holds — before we dig.",
  },
  {
    title: "Listening devices (in & out of the pool)",
    description:
      "Underwater hydrophones inside the pool plus amplified listening systems and deck/ground microphones outside the pool to hear leak signatures in the shell, fittings, and underground plumbing.",
  },
  {
    title: "Pipe cameras",
    description:
      "Pipe cameras to inspect underground plumbing runs and see the condition of lines that listening and pressure testing have flagged.",
  },
  {
    title: "Locating devices",
    description:
      "Electronic locating equipment to mark the exact repair spot under decks, concrete, and landscaping — so we open the right place, not the whole yard.",
  },
  {
    title: "Leaktronics & Anderson systems",
    description:
      "Full Leaktronics and Anderson leak detection systems — including Anderson Leakalyzer water-loss testing — so we verify real loss versus evaporation, then pinpoint the leak with the right tool for that pool.",
  },
] as const;

export const leakDetectionProcessIntro =
  "We provide dye testing and pressure testing to locate all sources of leaks in a pool. We also use pipe cameras, listening devices in the pool and outside the pool, and locating devices to find leaks no matter where they are. Both Leaktronics and Anderson leak detection systems help us pinpoint the leak — then we complete the pool leak repair.";


export const leakDetectionFaqs = [
  {
    question: "Do you offer pool leak repair in Austin?",
    answer:
      "Yes. Pool leak repair in Austin and Central Texas is a core specialty — we locate the leak with Leaktronics and Anderson systems, then complete the repair. That includes plumbing leaks under decks, shell and crack leaks, skimmer and fitting leaks, and equipment-pad leaks. Many repairs happen the same visit once the source is confirmed.",
  },
  {
    question: "How do you find and repair pool leaks?",
    answer: leakDetectionProcessIntro,
  },
  {
    question: "How much does pool leak detection cost?",
    answer: pricing.leakDetection.faqAnswer,
  },
  {
    question: "How much does pool leak repair cost?",
    answer: pricing.leakDetection.repairNote,
  },
  {
    question: "What if you can't find the leak?",
    answer: pricing.leakDetection.guaranteeFaqAnswer,
  },
  {
    question: "How do I know if my pool is leaking or just evaporating?",
    answer: `Central Texas heat can cause noticeable evaporation, but losing more than ${pricing.leakDetection.waterLossThresholdInches}″ per day usually points to a leak. We verify water loss on site with a Leakalyzer before running a full detection so you're not paying for work you don't need.`,
  },
] as const;

/** City-specific opening copy for local leak detection pages */
export const cityLeakDetectionIntros: Record<string, string> = {
  austin:
    "Need pool leak repair in Austin? Summer heat hides water loss until the bill spikes. From Northwest Hills and Circle C to Steiner Ranch and Mueller, we find leaks in the shell, plumbing, and equipment — then complete the pool leak repair so you stop wasting water and avoid structural damage.",
  georgetown:
    "Georgetown's growth means more pools — and more leaks. In Sun City, Wolf Ranch, and established neighborhoods throughout Georgetown, we find the source and fix it before a small leak becomes deck damage or a high water bill.",
  leander:
    "Based in Leander, we respond quickly to leak calls across Travisso, Crystal Falls, Bryson, and surrounding neighborhoods. If you're losing more than a quarter inch per day, we'll locate the leak and complete the repair — often the same week.",
  "cedar-park":
    "Cedar Park pools see heavy summer use — and shifting soil can stress underground plumbing. From Avery Ranch to Buttercup Creek, we use Leaktronics-certified detection to find leaks under decks and in equipment lines without unnecessary digging.",
  "round-rock":
    "Round Rock homeowners call us when autofill runs constantly or the pool won't hold water. We serve Teravista, Forest Creek, Behren's Ranch, and neighborhoods across Round Rock with electronic detection and lasting leak repairs.",
  pflugerville:
    "Pflugerville pools — especially older backyard systems in Blackhawk, Avalon, and established subdivisions — develop plumbing and shell leaks over time. We verify water loss on site, locate the source, and quote a clear repair.",
  "liberty-hill":
    "Liberty Hill's hill country lots and newer pool construction still see leaks in plumbing, equipment pads, and pool shells. We help homeowners stop water loss before it undermines decking or wastes hundreds of gallons a week.",
  "san-marcos":
    "San Marcos pools — from established neighborhoods near Texas State to newer builds on the I-35 corridor — need accurate detection when water loss won't quit. We find leaks in shell, plumbing, and equipment, then handle the repair.",
  manor:
    "Manor and eastern Travis County pools are often on larger lots with long plumbing runs. We trace underground leaks with listening equipment and pipe cameras so repairs are targeted — not guesswork.",
  jonestown:
    "Jonestown and North Lake Travis pools deal with hillside plumbing, rock, and sun exposure that stress fittings and lines. We locate leaks with hydrophones, pressure testing, and deck listening gear built for tough sites.",
  "lago-vista":
    "Lago Vista hillside pools often lose water through shell cracks, return lines, or equipment connections after years of lake-country weather. We pinpoint the leak and repair it before erosion or deck damage spreads.",
  spicewood:
    "Spicewood and Lake Travis area pools sit on rocky, sloped lots where plumbing leaks hide under decking and landscaping. Our Leaktronics-certified crew finds the source before we open concrete or rock.",
  lakeway:
    "Lakeway pools — many with spas, waterfalls, or long equipment runs — need precise detection when water bills spike or the autofill won't shut off. We serve Lakeway with the same gear and methods we use across Central Texas.",
  westlake:
    "Westlake and West Austin pools often have complex plumbing, spas, and mature landscaping that make leaks hard to find. We use electronic detection and pressure testing to isolate the problem with minimal disruption.",
  "dripping-springs":
    "Dripping Springs pools on larger Hill Country lots can lose water through long plumbing runs, equipment leaks, or shell issues. We verify real water loss on site, then locate and repair the leak.",
};

/** Keyword-rich meta descriptions per city */
export const cityLeakDetectionMeta: Record<string, string> = {
  austin:
    "Pool leak repair in Austin, TX — find and fix shell, plumbing, and equipment leaks. Dye testing, pressure testing, Leaktronics & Anderson. Call 512-947-2023.",
  georgetown:
    "Pool leak detection & repair in Georgetown, TX. Find hidden plumbing & shell leaks fast. Licensed & insured. Call 512-947-2023.",
  leander:
    "Pool leak detection & repair in Leander, TX. Local Leaktronics-certified team. Same-week scheduling when available. Call 512-947-2023.",
  "cedar-park":
    "Pool leak detection & repair in Cedar Park, TX. Stop water loss under decks & in plumbing. Leakalyzer verified. Call 512-947-2023.",
  "round-rock":
    "Pool leak detection & repair in Round Rock, TX. Electronic locating & lasting repairs. Residential & commercial. Call 512-947-2023.",
  pflugerville:
    "Pool leak detection & repair in Pflugerville, TX. Leaktronics gear, clear pricing from $650. Down-payment guarantee. Call 512-947-2023.",
  "liberty-hill":
    "Pool leak detection & repair in Liberty Hill, TX. Shell, plumbing & equipment leaks located & fixed. Call 512-947-2023.",
  "san-marcos":
    "Pool leak detection & repair in San Marcos, TX. Certified detection & professional repairs. Call 512-947-2023.",
  manor:
    "Pool leak detection & repair in Manor, TX. Underground plumbing leaks located with listening gear. Call 512-947-2023.",
  jonestown:
    "Pool leak detection & repair in Jonestown, TX. Lake Travis area leaks found & repaired. Call 512-947-2023.",
  "lago-vista":
    "Pool leak detection & repair in Lago Vista, TX. Hillside & lake-country pools. Leaktronics certified. Call 512-947-2023.",
  spicewood:
    "Pool leak detection & repair in Spicewood, TX. Rock, deck & plumbing leaks located accurately. Call 512-947-2023.",
  lakeway:
    "Pool leak detection & repair in Lakeway, TX. Spas, equipment & plumbing leaks. Licensed & insured. Call 512-947-2023.",
  westlake:
    "Pool leak detection & repair in Westlake, TX. Complex pools & spas — electronic detection. Call 512-947-2023.",
  "dripping-springs":
    "Pool leak detection & repair in Dripping Springs, TX. Hill Country pools — verify, locate & repair. Call 512-947-2023.",
};

type LeakFaq = { question: string; answer: string };

/** Extra local FAQ copy beyond the shared templates */
const cityLeakFaqLocalNotes: Record<string, string> = {
  austin:
    "Austin's heat and long swim seasons make even small leaks expensive fast — especially when autofill masks the problem until your water bill spikes.",
  georgetown:
    "Many Georgetown pools are 15–25 years old with original plumbing that's ready for pressure testing when water loss won't stop.",
  leander:
    "As a Leander-based company, we often schedule leak detections in Leander and nearby communities ahead of other areas.",
  "cedar-park":
    "Cedar Park's clay soils and summer heat expansion can crack fittings and stress underground PVC — common sources we isolate with deck microphones.",
  "round-rock":
    "Round Rock pools with in-floor cleaning systems need head-by-head testing — we include up to 20 heads in our base in-floor pricing.",
  pflugerville:
    "Pflugerville homeowners often notice leaks first when the pool level drops overnight or the autofill runs for hours after the sun goes down.",
  "liberty-hill":
    "On larger Liberty Hill lots, long plumbing runs make electronic listening essential — we trace the line instead of trenching blindly.",
  "san-marcos":
    "San Marcos pools near the river corridor can confuse evaporation with real loss — we confirm with a Leakalyzer before a full detection.",
};

function buildDefaultLeakFaqs(cityName: string, localNote?: string): LeakFaq[] {
  const areaNote = localNote
    ? ` ${localNote}`
    : ` ${cityName} heat and heavy pool use make early detection worthwhile.`;

  return [
    {
      question: `Do you offer pool leak repair in ${cityName}?`,
      answer: `Yes — pool leak repair in ${cityName} is a core service. After we locate the leak, we quote the repair based on access, depth, and whether the line is under decking or landscaping. Many jobs are completed the same visit once the source is confirmed.`,
    },
    {
      question: `How do you find pool leaks in ${cityName}?`,
      answer: `${leakDetectionProcessIntro} We serve ${cityName} and nearby communities from our Leander base.`,
    },
    {
      question: `How much does pool leak detection cost in ${cityName}?`,
      answer: `${pricing.leakDetection.faqAnswer} We serve ${cityName} and nearby communities from our Leander base.`,
    },
    {
      question: `How much does pool leak repair cost in ${cityName}?`,
      answer: `${pricing.leakDetection.repairNote} We serve ${cityName} and nearby communities from our Leander base.`,
    },
    {
      question: `How do I know if my pool is leaking in ${cityName}?`,
      answer: `If you're losing more than ${pricing.leakDetection.waterLossThresholdInches}″ per day, seeing wet spots near equipment, or constantly refilling, it's worth a professional check.${areaNote} We verify water loss on site before recommending a full detection.`,
    },
  ];
}

const cityLeakDetectionFaqs: Record<string, LeakFaq[]> = Object.fromEntries(
  getCitiesForService(leakDetectionSlug).map((city) => [
    city.slug,
    buildDefaultLeakFaqs(city.name, cityLeakFaqLocalNotes[city.slug]),
  ]),
);

export function getCityLeakDetectionIntro(citySlug: string, cityName: string): string {
  const intro = cityLeakDetectionIntros[citySlug];
  if (intro) {
    return `${intro} ${site.name} serves homeowners and realtors throughout ${cityName} and surrounding communities.`;
  }
  return `Homeowners and realtors in ${cityName} trust ${site.name} for professional pool leak detection and repair. ${leakDetectionProcessIntro}`;
}

export function getCityLeakDetectionMeta(citySlug: string, cityName: string): string {
  return (
    cityLeakDetectionMeta[citySlug] ??
    `Pool leak repair in ${cityName}, TX. Dye testing, pressure testing, Leaktronics & Anderson systems. Licensed & insured. Call ${site.phone}.`
  );
}

export function getCityLeakDetectionFaqs(citySlug: string, cityName: string): LeakFaq[] {
  return (
    cityLeakDetectionFaqs[citySlug] ?? buildDefaultLeakFaqs(cityName, cityLeakFaqLocalNotes[citySlug])
  );
}
