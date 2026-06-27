import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";
import { poolEquipment, poolEquipmentPhrase } from "@/content/equipment";
import { pricing } from "@/content/pricing";

export const leakDetectionProcess = [
  {
    step: "1",
    title: "On-site water loss check",
    description:
      "We verify water loss on site using a Leakalyzer system — so we know whether you're dealing with a real leak before we go further.",
  },
  {
    step: "2",
    title: "Pressure & electronic testing",
    description:
      "We pressure-test plumbing lines and use electronic listening equipment to isolate leaks in pipes, fittings, and equipment.",
  },
  {
    step: "3",
    title: "Pool shell & underwater inspection",
    description:
      "When needed, we inspect the vessel underwater — skimmers, lights, returns, and structural areas — without unnecessary draining.",
  },
  {
    step: "4",
    title: "Clear findings & repair plan",
    description:
      "You get straightforward answers: where the leak is, what it will take to fix it, and what happens next. No guessing games.",
  },
] as const;

export const ourPromise = [
  {
    title: "Repair & renovation experts",
    description: `Leak detection technicians and pool repair specialists for ${poolCareOffering.inlineList}.`,
  },
  {
    title: "Specialists — not a cleaning company",
    description:
      "We don't offer weekly pool cleaning. We focus on leak work, equipment, renovations, and inspections — and partner with pool service companies for specialist referrals.",
  },
  {
    title: "Fair leak detection pricing",
    description: pricing.leakDetection.guaranteeSummary,
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
      "Yes. Pool renovations and replastering are a core part of what we do — replaster, PebbleTec, tile, coping, and full remodels with free on-site consultations for residential and commercial properties.",
  },
  {
    question: "Do you offer weekly pool cleaning or maintenance?",
    answer:
      "No — we don't offer weekly cleaning to homeowners. Our focus is leak detection and repair, pool equipment repair and replacement, pool renovations and replaster, and pool inspections when you need them.",
  },
  {
    question: "Do you work with pool cleaning companies?",
    answer:
      "Yes. Pool service companies partner with us for leak detection, pool equipment repair, renovations, and inspections. Partners get competitive pricing to resell our services, priority scheduling for referrals, and direct support when questions or issues come up — so you can better serve your customers without competing for weekly cleaning routes. Visit our Partners page or call us to get started.",
  },
  {
    question: "What pool equipment do you repair?",
    answer: `We repair and replace pool equipment — ${poolEquipment.inlineList}. That includes pumps, filters, heaters, automation and control systems, pool lights, and related electrical work. We're RAIL certified for pool electrical service in Texas.`,
  },
  {
    question: "How do I know if my pool has a leak?",
    answer:
      "Common signs include water level dropping faster than normal evaporation, rising water bills, soggy spots around the pool, air in the pump, or trouble keeping chemicals balanced. If your pool is losing more than ½ inch of water per day, it's time to schedule a professional leak evaluation.",
  },
  {
    question: "What is your leak detection guarantee?",
    answer: pricing.leakDetection.guaranteeDetail,
  },
  {
    question: "What is a Leakalyzer and why do you use it?",
    answer:
      "A Leakalyzer measures water loss on site so we can confirm whether your pool is actually leaking — and how much — before committing to a full detection. It's part of how we keep the process honest and data-driven, not guesswork.",
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
    answer: `We serve ${site.serviceAreas.join(", ")}, and surrounding Central Texas communities — with a growing focus on Austin and Georgetown.`,
  },
  {
    question: "Are you licensed and insured?",
    answer: `Yes. ${site.name} is licensed, insured, and ${site.railCertified.label} for pool electrical work in Texas. We serve ${site.serviceScope.label.toLowerCase()} customers across Central Texas.`,
  },
  {
    question: "What is RAIL certification and why does it matter?",
    answer: site.railCertified.description,
  },
  {
    question: "Do you serve commercial properties?",
    answer: `Yes. We serve residential and commercial customers — ${site.serviceScope.description.toLowerCase()} Whether it's a backyard pool, HOA amenity, or commercial property, we handle leak detection, ${poolEquipmentPhrase()}, renovations, and inspections.`,
  },
];
