/** Business accreditations and industry certifications — single source of truth */

export type Credential = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  href?: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const footerCredentials: Credential[] = [
  {
    id: "bbb",
    title: "BBB Accredited Business",
    shortLabel: "BBB Accredited",
    description:
      "911 Pool Care is a Better Business Bureau accredited business — recognized for commitment to trust, transparency, and responsive customer service.",
    href: "https://www.bbb.org/us/tx/leander/profile/pool-contractors/911-pool-care-llc-0825-1000239743",
    image: {
      src: "/images/credentials/bbb-accredited.png",
      width: 93,
      height: 93,
      alt: "Better Business Bureau Accredited Business",
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
] as const;

export function getCredentialById(id: string): Credential | undefined {
  return footerCredentials.find((credential) => credential.id === id);
}
