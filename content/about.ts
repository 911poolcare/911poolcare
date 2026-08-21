import { footerCredentials } from "@/content/credentials";
import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";

export const about = {
  metaTitle: "About Our Austin Pool Repair Team",
  metaDescription:
    "Meet Chris, Danielle, Steven & Breanna — the Central Texas pool repair specialists behind 911 Pool Care. TDLR-licensed RAIC contractor, Leaktronics-certified leak detection, RAIL-certified equipment work, CPI inspections & renovations. Technicians, not pool cleaners.",
  headline: "Technicians. Experts. Not pool cleaners.",
  subhead:
    "911 Pool Care was built with one goal: be the best and most consistent pool repair and renovation specialists in our field.",
  mission:
    "We are technicians and experts in leak detection and repair, equipment repair and replacement, pool renovations and replaster, and inspections — not a cleaning company that occasionally handles technical work.",
  story: [
    "With more than seven years in the industry, we have trained, certified, and refined our processes, techniques, and methods to deliver a quality experience from first contact through job completion — and warranty support when you need it.",
    "We strive to deliver exactly what you are looking for: quality work, clear communication, and respect on every project. We are not the largest team in the area, and that is intentional. Our goal is to be the best.",
    "911 Pool Care is still locally owned and operated. As we grow across Central Texas, we have the processes and structure in place to keep delivering the quality, customer-first experience our clients count on.",
  ],
  vision: {
    title: "Our Vision",
    statement:
      "911 Pool Care exists to be the most trusted specialty pool care team in Texas.",
    description:
      "We are building that trust through honest diagnoses, clear communication, skilled workmanship, and consistent service across every job and every future 911 Pool Care location.",
  },
  pillars: [
    {
      title: "Trained & certified",
      description:
        "Our team is built for technical pool work — diagnostics, repairs, renovations, and inspections — with methods developed over years in the field.",
    },
    {
      title: "Communication & respect",
      description:
        "Breanna coordinates scheduling and quotes from the office. In the field, Danielle and Steven keep you informed — and Chris stays your point of contact on renovations and inspections.",
    },
    {
      title: "Quality over volume",
      description:
        "We would rather do fewer jobs the right way than chase volume. Consistency and accountability matter more to us than being the biggest name on the list.",
    },
    {
      title: "Locally owned, built to scale",
      description:
        "We are expanding in Austin, Georgetown, and surrounding communities — with systems in place so growth does not mean a drop in service.",
    },
  ],
  credentials: [
    { label: "7+ years in the pool industry" },
    { label: site.veteranOwned.label },
    { label: site.raicLicensed.shortLabel },
    { label: footerCredentials.find((c) => c.id === "bbb")!.shortLabel },
    { label: footerCredentials.find((c) => c.id === "cbp")!.shortLabel },
    { label: footerCredentials.find((c) => c.id === "cpi")!.shortLabel },
    { label: site.railCertified.label },
    { label: "Licensed & insured" },
    { label: formatGoogleReviewsLabel() },
  ],
  servicesIntro:
    `Our leak detection technicians, pool repair experts, and renovation specialists cover ${poolCareOffering.inlineList} for residential and commercial properties across Central Texas.`,
  community: {
    eyebrow: "Community",
    title: "Proud supporters of the Rouse Raiders",
    description:
      "As a Leander-based, locally owned company, we're proud to support our local high school football team — the Rouse Raiders.",
    href: "https://www.rouseraidersfootball.com/",
    image: {
      src: "/images/community/rouse-raiders-helmet.png",
      alt: "Rouse Raiders football helmet",
      width: 480,
      height: 480,
    },
  },
} as const;

function formatGoogleReviewsLabel(): string {
  const { rating, reviewCount } = site.google;
  return `${rating.toFixed(1)} Google rating · ${reviewCount.toLocaleString("en-US")} reviews`;
}
