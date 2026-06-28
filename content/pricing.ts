import { inspectionSeo } from "@/content/inspections";
import { site } from "@/content/site";

export const pricing = {
  renovation: {
    consultationLabel: "Free renovation consultation",
    consultationDescription:
      "Complimentary on-site consultations for pool renovation and replaster projects.",
  },
  leakDetection: {
    poolOnlySinglePump: 650,
    poolAndSpaSinglePump: 750,
    additionalPump: 150,
    infinityEdgeCatchBasin: 150,
    inFloorCleaning: {
      base: 400,
      headsIncluded: 20,
      perAdditionalHead: 20,
    },
    commercialStartingAt: 750,
    downPayment: 120,
    waterLossThresholdInches: 0.5,
    summary:
      "Residential leak detection starts at $650 for a basic pool with a single pump — with a $120 down-payment guarantee when we can't locate the leak.",
    residentialGuaranteeSummary:
      "Residential pools losing over ½″ per day: if we can't locate the leak after on-site testing, you pay only the $120 down payment — not the full leak detection fee.",
    residentialGuaranteeDetail:
      "For residential pools losing more than ½ inch of water per day, we verify water loss on site before a full detection. If we cannot locate the leak, you pay only the $120 down payment — not the remainder of the leak detection service.",
    commercialNote:
      "Commercial leak detection does not include the residential down-payment guarantee.",
    partnerNote:
      "Pool company partners are not charged the $120 leak detection deposit on referred jobs.",
    repairNote:
      "Leak repairs are custom quotes. Cost depends on variables such as whether the leak is in-ground, under concrete, depth, access, and more.",
    faqAnswer:
      "Leak detection starts at $650 for a basic pool only with a single pump. Pool and spa with a single pump is $750. Each additional pump is $150 (booster pumps are not counted). Catch basins for infinity edge pools are an additional $150. In-floor cleaning systems start at $400 and include up to 20 in-floor heads tested — $20 for each additional head. Commercial pools start at $750 and are usually custom quotes. Leak repairs are quoted separately based on location, access, and repair scope.",
    guaranteeFaqAnswer:
      "For residential pools losing more than ½ inch of water per day, we verify water loss on site before a full detection. If we cannot locate the leak, you pay only the $120 down payment — not the remainder of the leak detection service. This guarantee applies to residential properties only — not commercial pools. Pool company partners are not charged the $120 deposit on referred leak detection jobs.",
    pricingLines: [
      {
        label: "Pool only (single pump)",
        value: "$650",
      },
      {
        label: "Pool and spa (single pump)",
        value: "$750",
      },
      {
        label: "Each additional pump",
        value: "+$150",
        note: "Booster pumps are not counted.",
      },
      {
        label: "Catch basin (infinity edge pools)",
        value: "+$150",
      },
      {
        label: "In-floor cleaning system",
        value: "From $400",
        note: "Includes up to 20 in-floor heads tested; $20 for each additional head.",
      },
      {
        label: "Commercial pools",
        value: "From $750",
        note: "Usually a custom quote. Does not include the residential down-payment guarantee.",
      },
    ],
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
    return `${pricing.leakDetection.residentialGuaranteeSummary} We serve homeowners and realtors ${area}.`;
  }

  if (serviceSlug === "pool-inspections") {
    return inspectionSeo.schedulingNote;
  }

  return `Based in ${site.address.city}, we respond quickly to service calls ${area}. Call or submit a request and we'll get you scheduled.`;
}
