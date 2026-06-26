import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";

export const about = {
  metaTitle: "About Us",
  metaDescription:
    "Locally owned pool specialists in Central Texas. 7+ years of leak detection, equipment repair, renovations, and inspections — technicians, not pool cleaners.",
  headline: "Technicians. Experts. Not pool cleaners.",
  subhead:
    "911 Pool Care was built with one goal: be the best and most consistent pool care specialists in our field.",
  mission:
    "We are technicians and experts in leak detection and repair, equipment repair and replacement, pool renovations and replaster, and inspections — not a cleaning company that occasionally handles technical work.",
  story: [
    "With more than seven years in the industry, we have trained, certified, and refined our processes, techniques, and methods to deliver a quality experience from first contact through job completion — and warranty support when you need it.",
    "We strive to deliver exactly what you are looking for: quality work, clear communication, and respect on every project. We are not the largest team in the area, and that is intentional. Our goal is to be the best.",
    "911 Pool Care is still locally owned and operated. As we grow across Central Texas, we have the processes and structure in place to keep delivering the quality, customer-first experience our clients count on.",
  ],
  pillars: [
    {
      title: "Trained & certified",
      description:
        "Our team is built for technical pool work — diagnostics, repairs, renovations, and inspections — with methods developed over years in the field.",
    },
    {
      title: "Communication & respect",
      description:
        "You get straight answers, clear expectations, and respectful service from the first call through project completion.",
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
    { label: site.railCertified.label },
    { label: "Licensed & insured" },
    { label: formatGoogleReviewsLabel() },
  ],
  servicesIntro:
    `Our work covers ${poolCareOffering.inlineList} for residential and commercial properties across Central Texas.`,
} as const;

function formatGoogleReviewsLabel(): string {
  const { rating, reviewCount } = site.google;
  return `${rating.toFixed(1)} Google rating · ${reviewCount.toLocaleString("en-US")} reviews`;
}
