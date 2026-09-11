import { renovationCertifiedInstallers, renovationLeakCheckBeforePlaster } from "@/content/renovations";
import { site } from "@/content/site";

export const warrantyPage = {
  slug: "warranty",
  title: "Pool renovation warranty",
  metaTitle: "Pool Renovation Warranty Austin TX",
  metaDescription:
    "Workmanship coverage and manufacturer warranty eligibility on Pebble Tec and Pebble Sheen applied by certified installers. 911 Pool Care leak-checks every pool before plaster.",
  headline: "Warranty on renovations and certified finishes",
  intro:
    "Peace of mind on a replaster or remodel comes from two places: how the work is done, and whether a manufacturer will stand behind the finish. We keep those separate so you are not sold a slogan.",
  workmanship: {
    title: "Our workmanship",
    body: `911 Pool Care stands behind renovation workmanship — surface prep, installation quality, and the details we control on site. Chris is your project manager from consultation through final walkthrough. If something in our work needs attention after handoff, call ${site.phone} and we will make it right.`,
  },
  manufacturer: {
    title: "Manufacturer warranty eligibility",
    body: renovationCertifiedInstallers,
  },
  leakCheck: {
    title: "Why we leak-check first",
    body: renovationLeakCheckBeforePlaster,
  },
} as const;
