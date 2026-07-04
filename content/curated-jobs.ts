import type { MediaJob } from "@/content/generated/media-manifest";

type CuratedMediaJob = MediaJob & { displayLabel?: string };

type CuratedJobSpec = {
  citySlug: string;
  cityName: string;
  stages?: Array<"before" | "during" | "after">;
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
  { citySlug: "westlake", cityName: "Westlake", stages: ["during"] },
];

type EquipmentJobSpec = {
  citySlug: string;
  cityName: string;
  jobKey: string;
  displayLabel: string;
  stages: Array<"before" | "during" | "after">;
};

const EQUIPMENT_JOBS: EquipmentJobSpec[] = [
  {
    citySlug: "manor",
    cityName: "Manor",
    jobKey: "pump-motor",
    displayLabel: "Manor — pump motor replacement",
    stages: ["before", "after"],
  },
  {
    citySlug: "leander",
    cityName: "Leander",
    jobKey: "heater",
    displayLabel: "Leander — gas heater replacement",
    stages: ["before", "after"],
  },
  {
    citySlug: "leander",
    cityName: "Leander",
    jobKey: "booster-pump",
    displayLabel: "Leander — booster pump replacement",
    stages: ["before", "after"],
  },
  {
    citySlug: "leander",
    cityName: "Leander",
    jobKey: "pump",
    displayLabel: "Leander — variable-speed pump upgrade",
    stages: ["before", "after"],
  },
  {
    citySlug: "dripping-springs",
    cityName: "Dripping Springs",
    jobKey: "chlorinator",
    displayLabel: "Dripping Springs — chlorinator replacement",
    stages: ["before", "after"],
  },
  {
    citySlug: "cedar-park",
    cityName: "Cedar Park",
    jobKey: "filter",
    displayLabel: "Cedar Park — cartridge filter replacement",
    stages: ["before", "after"],
  },
  {
    citySlug: "georgetown",
    cityName: "Georgetown",
    jobKey: "filter",
    displayLabel: "Georgetown — filter replacement",
    stages: ["before", "during", "after"],
  },
  {
    citySlug: "georgetown",
    cityName: "Georgetown",
    jobKey: "equipment",
    displayLabel: "Georgetown — equipment replacement",
    stages: ["before", "after"],
  },
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
    file: "field-georgetown-diver-detection.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Diver with hydrophone and blueprints during pool leak detection — Georgetown",
    caption: "Dive detection with hydrophone and pool plans",
  },
  {
    file: "field-georgetown-pipe-leak.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Active PVC pipe leak found at equipment pad — Georgetown",
    caption: "Active pipe leak located at equipment pad",
  },
  {
    file: "field-georgetown-deck-cut.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Crew cutting pool deck to access underground plumbing — Georgetown",
    caption: "Deck cut to access underground leak",
  },
  {
    file: "field-georgetown-deck-dig.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Technician reaching into excavated deck opening to repair pool plumbing — Georgetown",
    caption: "Accessing underground plumbing through deck opening",
  },
  {
    file: "field-georgetown-underground-repair.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Crew excavating pool deck for underground pipe repair — Georgetown",
    caption: "Excavation for underground pipe repair",
  },
  {
    file: "field-georgetown-cracked-pvc.png",
    citySlug: "georgetown",
    cityName: "Georgetown",
    alt: "Cracked underground PVC pipe found during leak repair — Georgetown",
    caption: "Cracked PVC located underground",
  },
  {
    file: "field-leander-underground-repair.png",
    citySlug: "leander",
    cityName: "Leander",
    alt: "Underground PVC pipe repaired with purple primer — Leander",
    caption: "Underground pipe repair with new fittings",
  },
  {
    file: "field-leander-deck-excavation.png",
    citySlug: "leander",
    cityName: "Leander",
    alt: "Deck excavation revealing underground plumbing at pool edge — Leander",
    caption: "Deck cut exposing underground plumbing",
  },
  {
    file: "field-leander-leakalyzer-setup.png",
    citySlug: "leander",
    cityName: "Leander",
    alt: "Leakalyzer water-loss testing equipment set up poolside — Leander",
    caption: "Leakalyzer setup for water-loss testing",
  },
  {
    file: "field-leander-shell-crack.png",
    citySlug: "leander",
    cityName: "Leander",
    alt: "Finger pointing to shell crack at coping joint during leak inspection — Leander",
    caption: "Shell crack identified at coping joint",
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

function buildRenovationJob({
  citySlug,
  cityName,
  stages = ["before", "during", "after"],
}: CuratedJobSpec): CuratedMediaJob {
  return {
    id: `curated--pool-renovations--${citySlug}`,
    serviceSlug: "pool-renovations",
    date: "curated",
    citySlug,
    displayLabel: `${cityName} — pool renovation`,
    images: stages.map((stage) => renovationImage(citySlug, stage, cityName)),
    videos: [],
  };
}

function buildEquipmentJob({
  citySlug,
  cityName,
  jobKey,
  displayLabel,
  stages,
}: EquipmentJobSpec): CuratedMediaJob {
  return {
    id: `curated--pool-equipment-repair--${citySlug}-${jobKey}`,
    serviceSlug: "pool-equipment-repair",
    date: "curated",
    citySlug,
    displayLabel,
    images: stages.map((stage) => {
      const stageLabel = stage.charAt(0).toUpperCase() + stage.slice(1);
      return {
        src: `/images/jobs/pool-equipment-repair/curated-${citySlug}-${jobKey}-${stage}.png`,
        kind: "image" as const,
        alt: `${displayLabel} — ${stageLabel.toLowerCase()}`,
        caption: stageLabel,
      };
    }),
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

function buildLeakFieldPhotosJobs(): CuratedMediaJob[] {
  const byCity = new Map<string, FieldPhotoSpec[]>();
  for (const photo of LEAK_FIELD_PHOTOS) {
    const existing = byCity.get(photo.citySlug) ?? [];
    existing.push(photo);
    byCity.set(photo.citySlug, existing);
  }

  return Array.from(byCity.entries()).map(([citySlug, photos]) => ({
    id: `curated--pool-leak-detection--field-${citySlug}`,
    serviceSlug: "pool-leak-detection",
    date: "curated",
    citySlug,
    images: photos.map((photo) => ({
      src: `/images/jobs/pool-leak-detection/${photo.file}`,
      kind: "image" as const,
      alt: photo.alt,
      caption: photo.caption,
    })),
    videos: [],
  }));
}

const INSPECTION_FIELD_PHOTOS: FieldPhotoSpec[] = [
  {
    file: "curated-cedar-park-inspection-01.png",
    citySlug: "cedar-park",
    cityName: "Cedar Park",
    alt: "Anderson Leakalyzer setup during a certified pool inspection in Cedar Park, TX",
    caption: "On-site water-loss testing during a pool inspection",
  },
  {
    file: "field-leander-inspection-fill.png",
    citySlug: "leander",
    cityName: "Leander",
    alt: "Pool filling after replaster with dye cones visible during leak inspection — Leander",
    caption: "Post-replaster fill and leak inspection",
  },
  {
    file: "field-leander-inspection-tile.png",
    citySlug: "leander",
    cityName: "Leander",
    alt: "Close-up of waterline tile and pebble finish during pool inspection — Leander",
    caption: "Waterline tile and finish detail inspection",
  },
];

function buildInspectionFieldPhotosJobs(): CuratedMediaJob[] {
  const byCity = new Map<string, FieldPhotoSpec[]>();
  for (const photo of INSPECTION_FIELD_PHOTOS) {
    const existing = byCity.get(photo.citySlug) ?? [];
    existing.push(photo);
    byCity.set(photo.citySlug, existing);
  }

  return Array.from(byCity.entries()).map(([citySlug, photos]) => ({
    id: `curated--pool-inspections--field-${citySlug}`,
    serviceSlug: "pool-inspections",
    date: "curated",
    citySlug,
    images: photos.map((photo) => ({
      src: `/images/jobs/pool-inspections/${photo.file}`,
      kind: "image" as const,
      alt: photo.alt,
      caption: photo.caption,
    })),
    videos: [],
  }));
}

/** Hand-picked job photos — overrides auto-imported jobs per service. */
export const curatedJobsByService: Partial<Record<string, CuratedMediaJob[]>> = {
  "pool-renovations": RENOVATION_JOBS.map(buildRenovationJob),
  "pool-leak-detection": [
    ...LEAK_REPAIR_JOBS.map(buildLeakRepairJob),
    ...buildLeakFieldPhotosJobs(),
  ],
  "pool-equipment-repair": EQUIPMENT_JOBS.map(buildEquipmentJob),
  "pool-inspections": buildInspectionFieldPhotosJobs(),
};

export function getCuratedJobLabel(job: MediaJob): string | undefined {
  return (job as CuratedMediaJob).displayLabel;
}
