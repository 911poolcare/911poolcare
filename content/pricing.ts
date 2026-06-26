import { inspectionSeo } from "@/content/inspections";
import { site } from "@/content/site";

export const pricing = {
  renovation: {
    consultationLabel: "Free renovation consultation",
    consultationDescription:
      "Complimentary on-site consultations for pool renovation and replaster projects.",
  },
  leakDetection: {
    downPayment: 120,
    waterLossThresholdInches: 0.5,
    guaranteeSummary:
      "Pools losing over ½″ per day: if we can't locate the leak after on-site Leakalyzer testing, you pay only the $120 down payment — not the full leak detection fee.",
    guaranteeDetail:
      "For pools losing more than ½ inch of water per day, we start with an on-site Leakalyzer assessment. If we cannot locate the leak, you pay only the $120 down payment — not the remainder of the leak detection service. When we find the leak, we'll explain repair options and next steps clearly.",
  },
  equipment: {
    pumpDiagnostic: {
      fee: 120,
      repairCredit: 50,
      summary: "Pump diagnostic: $120 — includes a $50 credit toward repairs",
    },
    heaterDiagnostic: {
      fee: 150,
      repairCredit: 50,
      summary: "Heater diagnostic: $150 — includes a $50 credit toward repairs",
    },
  },
  inspection: {
    baseFee: 360,
    coldWaterAddOn: 120,
    onSiteHours: 2,
    summary:
      "Certified pool inspection: $360 — includes up to 2 hours on site, written report, and photo documentation.",
    coldWaterSummary:
      "Cold water add-on: +$120 when water temperature is below 70°F.",
  },
} as const;

export function getServiceCtaLabel(serviceSlug: string): string {
  if (serviceSlug === "pool-renovations") {
    return "Free Renovation Consultation";
  }
  if (serviceSlug === "pool-inspections") {
    return inspectionSeo.ctaLabel;
  }
  return "Request Service";
}

export function getServiceSchedulingNote(serviceSlug: string, cityName?: string): string {
  const area = cityName
    ? `throughout ${cityName} and nearby communities`
    : "across Central Texas";

  if (serviceSlug === "pool-renovations") {
    return `Based in ${site.address.city}, we offer free renovation consultations ${area}. We'll assess your pool, explain your options, and provide a clear plan — no pressure.`;
  }

  if (serviceSlug === "pool-equipment-repair") {
    return `We serve homeowners ${area}. Pump diagnostics are $${pricing.equipment.pumpDiagnostic.fee} and heater diagnostics are $${pricing.equipment.heaterDiagnostic.fee} — each includes a $${pricing.equipment.pumpDiagnostic.repairCredit} credit toward repairs when you approve the work.`;
  }

  if (serviceSlug === "pool-leak-detection") {
    return `${pricing.leakDetection.guaranteeSummary} We serve homeowners and realtors ${area}.`;
  }

  if (serviceSlug === "pool-inspections") {
    return inspectionSeo.schedulingNote;
  }

  return `Based in ${site.address.city}, we respond quickly to service calls ${area}. Call or submit a request and we'll get you scheduled.`;
}
