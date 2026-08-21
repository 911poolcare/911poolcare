/** Business accreditations and industry certifications — single source of truth */

export type Credential = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  href?: string;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  /** Text badge when no seal image (e.g. TDLR license number) */
  badgeText?: string;
};

export const bbbProfileUrl =
  "https://www.bbb.org/us/tx/leander/profile/pool-contractors/911-pool-care-llc-0825-1000239743";

/** Official BBB accredited seal — accreditation only, no rating date */
export const bbbSealImageUrl =
  "https://seal-austin.bbb.org/seals/blue-seal-200-130-whitetxt-bbb-0825-1000239743.png";

/** Public TDLR license search — homeowners can verify RAIL and other licenses */
export const tdlrVerifyUrl = "https://www.tdlr.texas.gov/verify.htm";

/** Direct TDLR record for 911 Pool Care LLC RAIC #1545 */
export const tdlrRaicLicenseUrl =
  "https://www.tdlr.texas.gov/LicenseSearch/SearchResultDetail.asp?1=ACTELE00001545&2=RAIC";

/**
 * Texas Department of Licensing and Regulation (TDLR) pool electrical licensing.
 * RAIC = company contractor license; RAIL = individual installer (Installer of Record).
 */
export const texasLicensing = {
  raic: {
    id: "raic",
    label: "Licensed RAIC Contractor",
    shortLabel: "RAIC #1545",
    fullName: "Residential Appliance Installation Contractor",
    number: "1545",
    displayNumber: "#1545",
    description:
      "911 Pool Care LLC is a TDLR-licensed Residential Appliance Installation Contractor (RAIC #1545) — the business-level license required to perform residential appliance installation work in Texas, including pool pumps, heaters, lights, motors, salt systems, automation, and related electrical work.",
    inline:
      "TDLR-licensed Residential Appliance Installation Contractor (RAIC #1545)",
    verifyUrl: tdlrRaicLicenseUrl,
  },
  rail: {
    id: "rail",
    label: "RAIL Installer of Record",
    shortLabel: "RAIL Certified",
    fullName: "Residential Appliance Installer License",
    number: "666617",
    displayNumber: "#666617",
    installerOfRecord: "Danielle",
    description:
      "RAIL — Residential Appliance Installer License — is the individual TDLR license required to perform residential appliance electrical work. Danielle holds RAIL #666617 and serves as our Installer of Record, sponsoring the company's RAIC contractor license for pool pumps, heaters, lights, automation, and related equipment.",
    inline:
      "RAIL-certified Installer of Record for Texas pool electrical work",
    verifyUrl: tdlrVerifyUrl,
  },
} as const;

export const footerCredentials: Credential[] = [
  {
    id: "raic",
    title: `${texasLicensing.raic.label} ${texasLicensing.raic.displayNumber}`,
    shortLabel: texasLicensing.raic.shortLabel,
    description: texasLicensing.raic.description,
    href: texasLicensing.raic.verifyUrl,
    badgeText: `RAIC ${texasLicensing.raic.displayNumber}`,
  },
  {
    id: "bbb",
    title: "BBB Accredited Business",
    shortLabel: "BBB Accredited",
    description:
      "911 Pool Care is a Better Business Bureau accredited business — recognized for commitment to trust, transparency, and responsive customer service.",
    href: bbbProfileUrl,
    image: {
      src: "/images/credentials/bbb-accredited.png",
      width: 200,
      height: 130,
      alt: "BBB Accredited Business",
    },
  },
  {
    id: "cbp",
    title: "Advanced CBP Certified",
    shortLabel: "Advanced CBP",
    description:
      "Advanced Certified Building Professional (CBP) certification through the Pool & Hot Tub Alliance (PHTA) — advanced training in pool construction, renovation, and technical pool work.",
    image: {
      src: "/images/credentials/advanced-cbp.png",
      width: 95,
      height: 97,
      alt: "Advanced Certified Building Professional (CBP)",
    },
  },
  {
    id: "cpi",
    title: "Certified Pool Inspector",
    shortLabel: "Certified Pool Inspector",
    description:
      "PHTA Certified Pool Inspector (CPI) — professional certification for pool inspections in real estate and property transactions, focused on condition, safety, and repair risk.",
    image: {
      src: "/images/credentials/certified-pool-inspector.png",
      width: 114,
      height: 97,
      alt: "PHTA Certified Pool Inspector",
    },
  },
];

export function getCredentialById(id: string): Credential | undefined {
  return footerCredentials.find((credential) => credential.id === id);
}
