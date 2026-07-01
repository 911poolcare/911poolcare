import {
  leakDetectionCertification,
  leakDetectionEquipmentBrands,
  leakDetectionPhilosophy,
} from "@/content/leak-detection";
import { footerCredentials } from "@/content/credentials";
import { renovationFinishesIntro } from "@/content/renovations";
import { poolEquipmentPhrase } from "@/content/equipment";
import { pricing } from "@/content/pricing";
import { poolCareOffering } from "@/content/service-offering";
import {
  formatServiceScopeDescriptionInline,
  getServiceAreasDisplay,
  site,
} from "@/content/site";

export const leakDetectionProcess = [
  {
    step: "1",
    title: "Visual inspection & dye testing",
    description:
      "We look at the pool running and not running — checking for wet spots, cracked or uneven patio areas, bubbles in return lines, and other clues that point to a possible leak.",
  },
  {
    step: "2",
    title: "Targeted dye testing",
    description:
      "We use dye testing in and around the pool to locate leaking pipes, lights, skimmers, and areas in the shell.",
  },
  {
    step: "3",
    title: "Pressure testing & electronic locating",
    description:
      "When needed, we pressure- and vacuum-test plumbing, then deploy Leaktronics and Anderson equipment — underwater hydrophones, amplified listening systems, and pipe cameras with locators — to pinpoint leaks under decks and in the ground.",
  },
  {
    step: "4",
    title: "Repair plan & options",
    description:
      "You get a precise plan for the best way to repair the leak — with options based on your budget and what's repairable.",
  },
] as const;

export const ourPromise = [
  {
    title: "Leaktronics certified detection",
    description: `${leakDetectionCertification.description} ${leakDetectionPhilosophy}`,
  },
  {
    title: "Specialists — not a cleaning company",
    description:
      "We don't offer weekly pool cleaning. We focus on leak work, equipment, renovations, and inspections — and partner with pool service companies for specialist referrals.",
  },
  {
    title: "Fair residential leak detection pricing",
    description: pricing.leakDetection.residentialGuaranteeSummary,
  },
  {
    title: "Clear equipment diagnostics",
    description: `${site.railCertified.description} Pump diagnostics are $120 ($50 credit toward repairs). Heater diagnostics are $150 ($50 credit toward repairs).`,
  },
  {
    title: "Free renovation consultations",
    description: pricing.renovation.consultationDescription,
  },
] as const;

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "What pool repair services do you offer?",
    answer: `We are leak detection technicians, pool repair experts, and renovation specialists — ${poolCareOffering.inlineList}. We do not offer weekly pool cleaning.`,
  },
  {
    question: "Do you offer pool renovation and replastering?",
    answer:
      `Yes. Pool renovations and replastering are a core part of what we do — ${renovationFinishesIntro.toLowerCase()} We also handle tile, coping, and full remodels with free on-site consultations for residential and commercial properties.`,
  },
  {
    question: "What pool finishes do you install?",
    answer: `${renovationFinishesIntro} We'll help you choose the right surface for your pool's condition, budget, and how you use it.`,
  },
  {
    question: "Do you offer weekly pool cleaning or maintenance?",
    answer:
      "No — we don't offer weekly cleaning to homeowners. Our focus is leak detection and repair, pool equipment repair and replacement, pool renovations and replaster, and pool inspections when you need them.",
  },
  {
    question: "Do you work with pool cleaning companies?",
    answer:
      "Yes. Pool service companies partner with us for leak detection, pool equipment repair, renovations, and inspections. Partners get competitive pricing to resell our services, priority scheduling for referrals, and direct support when questions or issues come up — so you can better serve your customers without competing for weekly cleaning routes. Partner referrals are not charged the $120 leak detection deposit. Visit our Partners page or call us to get started.",
  },
  {
    question: "What pool equipment do you repair?",
    answer: `We repair and replace pumps, filters, heaters, automation and control systems, pool lights, timers, and related electrical work. We're ${site.railCertified.inline}.`,
  },
  {
    question: "How do I know if my pool has a leak?",
    answer:
      "Common signs include water level dropping faster than normal evaporation, rising water bills, soggy spots around the pool, air in the pump, or trouble keeping chemicals balanced. If your pool is losing more than ½ inch of water per day, it's time to schedule a professional leak evaluation.",
  },
  {
    question: "How much does leak detection cost?",
    answer: pricing.leakDetection.faqAnswer,
  },
  {
    question: "What is your leak detection guarantee?",
    answer: pricing.leakDetection.guaranteeFaqAnswer,
  },
  {
    question: "How much do leak repairs cost?",
    answer: pricing.leakDetection.repairNote,
  },
  {
    question: "Are you Leaktronics certified for leak detection?",
    answer: `${leakDetectionCertification.description} ${leakDetectionEquipmentBrands}`,
  },
  {
    question: "What is a Leakalyzer and why do you use it?",
    answer:
      "The Leakalyzer from Anderson Manufacturing measures water loss on site so we can confirm whether your pool is actually leaking — and how much — before committing to a full detection. Combined with Leaktronics-certified methods and professional listening and pressure-testing gear, it keeps the process honest and data-driven, not guesswork.",
  },
  {
    question: "What does pool equipment diagnostic pricing look like?",
    answer: `${pricing.equipment.pumpDiagnostic.summary}. ${pricing.equipment.heaterDiagnostic.summary}. The credit applies when you approve the recommended repair work.`,
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "We offer free on-site consultations for pool renovation and replaster projects. Leak detection, equipment diagnostics, and inspections are quoted based on the service — with clear pricing explained before we begin.",
  },
  {
    question: "What areas do you serve?",
    answer: `We serve ${getServiceAreasDisplay().replace(/ · /g, ", ")}, and surrounding Central Texas communities — with a growing focus on Austin and Georgetown. Horseshoe Bay is currently served for pool renovations only.`,
  },
  {
    question: "Are you BBB accredited?",
    answer: `${footerCredentials[0].description} View our ${footerCredentials[0].shortLabel} profile on the Better Business Bureau website.`,
  },
  {
    question: "What is Advanced CBP certification?",
    answer: footerCredentials[1].description,
  },
  {
    question: "Are your pool inspectors certified?",
    answer: footerCredentials[2].description,
  },
  {
    question: "Are you licensed and insured?",
    answer: `Yes. ${site.name} is licensed, insured, and ${site.railCertified.label} for pool electrical work in Texas. We serve ${site.serviceScope.label.toLowerCase()} customers across Central Texas.`,
  },
  {
    question: "What is RAIL certification and why does it matter?",
    answer: `${site.railCertified.description} Pool pumps, heaters, lights, and automation all require properly licensed electrical work in Texas.`,
  },
  {
    question: "Do you serve commercial properties?",
    answer: `Yes. We serve residential and commercial customers — ${formatServiceScopeDescriptionInline()} Whether it's a backyard pool, HOA amenity, or commercial property, we handle leak detection, ${poolEquipmentPhrase()}, renovations, and inspections.`,
  },
];
