import type { MediaJob } from "@/content/generated/media-manifest";

type CuratedMediaJob = MediaJob & { displayLabel?: string };

type CuratedJobSpec = {
  citySlug: string;
  cityName: string;
};

type LeakRepairJobSpec = CuratedJobSpec & {
  jobKey: string;
  displayLabel: string;
};

type FieldPhotoSpec = {
  file: string;
  citySlug: string;
  cityName: string;
  alt: string;
  caption: string;
};

const RENOVATION_JOBS: CuratedJobSpec[] = [
  { citySlug: "austin", cityName: "Austin" },
  { citySlug: "leander", cityName: "Leander" },
  { citySlug: "cedar-park", cityName: "Cedar Park" },
  { citySlug: "spicewood", cityName: "Spicewood" },
  { citySlug: "lago-vista", cityName: "Lago Vista" },
];

const LEAK_REPAIR_JOBS: LeakRepairJobSpec[] = [
  {
    citySlug: "austin",
    cityName: "Austin",
    jobKey: "01",
    displayLabel: "Austin — separated underground line",
  },
  {
    citySlug: "austin",
    cityName: "Austin",
    jobKey: "02",
    displayLabel: "Austin — cracked PVC fitting",
  },
];

const LEAK_FIELD_PHOTOS: FieldPhotoSpec[] = [
  {
    file: "field-austin-dye-testing.png",
    citySlug: "austin",
    cityName: "Austin",
    alt: "Dye testing at a shell crack — Austin",
    caption: "Dye testing at a shell crack",
  },
  {
    file: "field-austin-return-fitting.png",
    citySlug: "austin",
    cityName: "Austin",
    alt: "Return fitting repair inside the pool — Austin",
    caption: "Return fitting repair in the pool",
  },
  {
    file: "field-westlake-electronic-detection.png",
    citySlug: "westlake",
    cityName: "Westlake",
    alt: "Electronic leak detection at a light niche — Westlake",
    caption: "Electronic detection at a light niche",
  },
  {
    file: "field-lakeway-old-fitting.png",
    citySlug: "lakeway",
    cityName: "Lakeway",
    alt: "Failed PVC fitting removed during leak repair — Lakeway",
    caption: "Failed fitting removed on site",
  },
  {
    file: "field-lakeway-pool-deck-dig.png",
    citySlug: "lakeway",
    cityName: "Lakeway",
    alt: "Pool deck excavation for underground leak repair — Lakeway",
    caption: "Deck excavation to reach the leak",
  },
  {
    file: "field-georgetown-deck-excavation.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Deck cut-out and underground line access — Georgetown",
    caption: "Deck cut-out for underground line access",
  },
  {
    file: "field-pflugerville-underground-line.png",
    citySlug: "pflugerville",
    cityName: "Pflugerville",
    alt: "Underground return line exposed during repair — Pflugerville",
    caption: "Underground return line exposed",
  },
  {
    file: "field-cedar-park-electronic-detection.png",
    citySlug: "cedar-park",
    cityName: "Cedar Park",
    alt: "Electronic leak detection at the pool edge — Cedar Park",
    caption: "Electronic leak detection at the pool edge",
  },
  {
    file: "field-cedar-park-underwater-inspection.png",
    citySlug: "cedar-park",
    cityName: "Cedar Park",
    alt: "Underwater inspection at a main drain and shell crack — Cedar Park",
    caption: "Underwater inspection at drain and shell crack",
  },
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

function buildRenovationJob({ citySlug, cityName }: CuratedJobSpec): CuratedMediaJob {
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

function buildLeakRepairJob({
  citySlug,
  cityName,
  jobKey,
  displayLabel,
}: LeakRepairJobSpec): CuratedMediaJob {
  const suffix = jobKey === "01" ? "" : `-${jobKey}`;
  return {
    id: `curated--pool-leak-detection--${citySlug}-repair${suffix}`,
    serviceSlug: "pool-leak-detection",
    date: "curated",
    citySlug,
    displayLabel,
    images: [
      {
        src: `/images/jobs/pool-leak-detection/curated-${citySlug}-repair${suffix}-before.png`,
        kind: "image",
        alt: `${cityName} underground pipe leak — before repair`,
        caption: "Before",
      },
      {
        src: `/images/jobs/pool-leak-detection/curated-${citySlug}-repair${suffix}-after.png`,
        kind: "image",
        alt: `${cityName} underground pipe leak — after repair`,
        caption: "After",
      },
    ],
    videos: [],
  };
}

function buildLeakFieldPhotosJob(): CuratedMediaJob {
  return {
    id: "curated--pool-leak-detection--field-photos",
    serviceSlug: "pool-leak-detection",
    date: "curated",
    citySlug: "austin",
    images: LEAK_FIELD_PHOTOS.map((photo) => ({
      src: `/images/jobs/pool-leak-detection/${photo.file}`,
      kind: "image" as const,
      alt: photo.alt,
      caption: photo.caption,
    })),
    videos: [],
  };
}

/** Hand-picked job photos — overrides auto-imported jobs per service. */
export const curatedJobsByService: Partial<Record<string, CuratedMediaJob[]>> = {
  "pool-renovations": RENOVATION_JOBS.map(buildRenovationJob),
  "pool-leak-detection": [
    ...LEAK_REPAIR_JOBS.map(buildLeakRepairJob),
    buildLeakFieldPhotosJob(),
  ],
};

export function getCuratedJobLabel(job: MediaJob): string | undefined {
  return (job as CuratedMediaJob).displayLabel;
}
