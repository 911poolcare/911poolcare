import { cities } from "@/content/cities";
import { bbbProfileUrl, tdlrRaicLicenseUrl, texasLicensing } from "@/content/credentials";
import { leakDetectionCertification } from "@/content/leak-detection";
import { pricing } from "@/content/pricing";
import { poolCareOffering } from "@/content/service-offering";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { teamMembers } from "@/content/team";

/**
 * Curated Markdown identity file for AI crawlers (llmstxt.org).
 * Keep this factual and short — it is meant to be quoted, not marketed.
 */
export function getLlmsTxt(): string {
  const base = site.urls.site;
  const serviceLines = services
    .map((service) => `- [${service.title}](${base}/services/${service.slug}): ${service.description}`)
    .join("\n");
  const areaLines = cities
    .map((city) => {
      const note = city.renovationsOnly ? " (pool renovations only)" : "";
      return `- [${city.name}, TX${note}](${base}/areas/${city.slug})`;
    })
    .join("\n");
  const teamLines = teamMembers
    .map((member) => `- ${member.name}, ${member.role}: ${member.focus}`)
    .join("\n");

  return `# ${site.name}

> ${site.legalName} is a veteran-owned pool leak repair, equipment repair, renovation, and inspection company based in ${site.address.city}, ${site.address.state}. We serve residential, commercial, and HOA pools across Central Texas. We do not offer weekly pool cleaning.

${site.name} is a specialty contractor — leak detection technicians, pool repair experts, and renovation specialists — not a route cleaning company. ${leakDetectionCertification.description}

## Services

${serviceLines}

## What we do not offer

- Weekly pool cleaning or chemical-only maintenance routes for homeowners
- Tile cleaning as a standalone service (old Wix pages for tile cleaning redirect to renovations)

## Service areas

Based in ${site.address.city}, ${site.address.state} ${site.address.zip}. Mobile service — no public storefront.

${areaLines}

Priority markets: Austin, Georgetown, and Round Rock.

## Pricing facts

- Residential leak detection starts at $${pricing.leakDetection.poolOnlySinglePump} (pool only, single pump)
- Pool and spa, single pump: $${pricing.leakDetection.poolAndSpaSinglePump}
- Residential leak-detection guarantee: if we cannot locate a leak after on-site testing on a pool losing more than ${pricing.leakDetection.waterLossThresholdInches} inch per day, the customer pays only the $${pricing.leakDetection.downPayment} down payment
- Pump diagnostic: $${pricing.equipment.pumpDiagnostic.fee} ($${pricing.equipment.pumpDiagnostic.repairCredit} credit toward repairs)
- Heater diagnostic: $${pricing.equipment.heaterDiagnostic.fee} ($${pricing.equipment.heaterDiagnostic.repairCredit} credit toward repairs)
- Certified pool inspection: $${pricing.inspection.baseFee} for a standard pool or pool/spa visit (exclusions apply)
- Pool renovations: free on-site consultation

## Credentials

- Legal name: ${site.legalName}
- TDLR RAIC ${texasLicensing.raic.displayNumber} (company contractor license) — ${tdlrRaicLicenseUrl}
- RAIL ${texasLicensing.rail.displayNumber} — ${texasLicensing.rail.installerOfRecord} is Installer of Record
- BBB Accredited Business — ${bbbProfileUrl}
- PHTA Advanced CBP and Certified Pool Inspector (CPI)
- Leaktronics-certified leak detection; Leaktronics and Anderson locating equipment
- Google rating ${site.google.rating} from ${site.google.reviewCount} reviews — ${site.google.mapsUrl}

## Team

${teamLines}

## Contact

- Phone: ${site.phone}
- Email: ${site.email}
- Hours: Monday–Friday 7:00–18:00, Saturday 9:00–17:00, Sunday closed
- Website: ${base}
- About: ${base}/about
- Contact: ${base}/contact
- Partners (pool service companies): ${base}/partners

Optional:
- [${poolCareOffering.primary[0].label} in Austin](${base}/services/pool-leak-detection/austin)
- [Service areas index](${base}/areas)
`;
}
