import { mediaJobs } from "@/content/generated/media-manifest";
import { site } from "@/content/site";

const documentedJobs = mediaJobs.filter(
  (job) => job.images.length > 0 || job.videos.length > 0,
).length;

/** Only figures we can prove from this repo or the Google profile. Not a lifetime total. */
export const proof = {
  yearsInIndustry: 7,
  yearsLabel: "7+ years in the pool industry",
  googleRating: site.google.rating,
  googleReviewCount: site.google.reviewCount,
  documentedJobs,
  documentedJobsLabel: `${documentedJobs} photographed jobs on this site`,
  documentedJobsNote:
    "Count of jobs with photos or video in our gallery — a documented lower bound, not a lifetime total.",
} as const;
