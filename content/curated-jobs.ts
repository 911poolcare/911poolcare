import type { MediaJob } from "@/content/generated/media-manifest";

type CuratedJobSpec = {
  citySlug: string;
  cityName: string;
};

const RENOVATION_JOBS: CuratedJobSpec[] = [
  { citySlug: "austin", cityName: "Austin" },
  { citySlug: "leander", cityName: "Leander" },
  { citySlug: "cedar-park", cityName: "Cedar Park" },
  { citySlug: "spicewood", cityName: "Spicewood" },
];

function renovationImage(
  citySlug: string,
  stage: "before" | "during" | "after",
  cityName: string,
): MediaJob["images"][number] {
  const stageLabel = stage.charAt(0).toUpperCase() + stage.slice(1);
  return {
    src: `/images/jobs/pool-renovations/curated-${citySlug}-${stage}.png`,
    kind: "image",
    alt: `${cityName} pool renovation — ${stageLabel.toLowerCase()}`,
    caption: stageLabel,
  };
}

function buildRenovationJob({ citySlug, cityName }: CuratedJobSpec): MediaJob {
  return {
    id: `curated--pool-renovations--${citySlug}`,
    serviceSlug: "pool-renovations",
    date: "curated",
    citySlug,
    images: [
      renovationImage(citySlug, "before", cityName),
      renovationImage(citySlug, "during", cityName),
      renovationImage(citySlug, "after", cityName),
    ],
    videos: [],
  };
}

/** Hand-picked before / during / after sets — overrides auto-imported jobs per service. */
export const curatedJobsByService: Partial<Record<string, MediaJob[]>> = {
  "pool-renovations": RENOVATION_JOBS.map(buildRenovationJob),
};
