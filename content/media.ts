import { curatedJobsByService, getCuratedJobLabel } from "@/content/curated-jobs";
import {
  featuredRenovationCollageCities,
  hubRenovationCollageCities,
  renovationSlug,
} from "@/content/renovations";
import type { City } from "@/content/cities";
import { cities, getCityBySlug } from "@/content/cities";
import { getCityHub } from "@/content/city-hubs";
import type { GalleryImage } from "@/content/galleries";
import { getServiceHeroPick } from "@/content/hero-images";
import { mediaJobs, type ManifestMedia, type MediaJob } from "@/content/generated/media-manifest";

const cityNames = cities.map((c) => c.name);

function stripCityFromText(text: string): string {
  for (const name of cityNames) {
    text = text
      .replace(new RegExp(` — ${name}$`), "")
      .replace(new RegExp(` — ${name},`), " —")
      .replace(new RegExp(`${name} — `), "")
      .replace(new RegExp(`${name},? TX`), "Central Texas")
      .replace(new RegExp(` in ${name}`), "")
      .replace(new RegExp(`${name} `), "");
  }
  return text;
}

export type GalleryVideo = {
  src: string;
  alt: string;
  poster?: string;
};

export type JobProgressSet = {
  id: string;
  label: string;
  cityName?: string;
  before?: GalleryImage;
  during?: GalleryImage;
  after?: GalleryImage;
};

function toGalleryImage(media: ManifestMedia): GalleryImage {
  return {
    src: media.src,
    alt: media.alt,
    caption: media.caption,
  };
}

function jobsForService(serviceSlug: string): MediaJob[] {
  const curated = curatedJobsByService[serviceSlug];
  if (curated?.length) return curated;

  return mediaJobs.filter((job) => job.serviceSlug === serviceSlug);
}

function jobsForCity(serviceSlug: string, citySlug: string): MediaJob[] {
  return jobsForService(serviceSlug).filter((job) => job.citySlug === citySlug);
}

export function getServiceHeroImage(serviceSlug: string): string | undefined {
  const curated = getServiceHeroPick(serviceSlug);
  if (curated) return curated.src;

  const job = jobsForService(serviceSlug).find((item) => item.images.length > 0);
  if (!job) return undefined;
  return job.images[job.images.length - 1]?.src ?? job.images[0]?.src;
}

export function getCityServiceHeroImage(
  serviceSlug: string,
  citySlug: string,
): string | undefined {
  const cityJobs = jobsForCity(serviceSlug, citySlug);
  const jobWithAfter = cityJobs.find((item) =>
    item.images.some((image) => image.caption?.toLowerCase() === "after"),
  );
  if (jobWithAfter) {
    const after = jobWithAfter.images.find(
      (image) => image.caption?.toLowerCase() === "after",
    );
    if (after) return after.src;
  }

  const job = cityJobs.find((item) => item.images.length > 0);
  if (job && job.images.length > 0) {
    return job.images[job.images.length - 1]?.src ?? job.images[0]?.src;
  }

  return getServiceHeroImage(serviceSlug);
}

export function getServiceGalleryImages(serviceSlug: string, limit = 8): GalleryImage[] {
  const images: GalleryImage[] = [];
  for (const job of jobsForService(serviceSlug)) {
    for (const image of job.images) {
      images.push(toGalleryImage(image));
      if (images.length >= limit) return images;
    }
  }
  return images;
}

export function getCityServiceGalleryImages(
  serviceSlug: string,
  citySlug: string,
  limit = 8,
): GalleryImage[] {
  const cityJobs = jobsForCity(serviceSlug, citySlug);
  const images: GalleryImage[] = [];

  for (const job of cityJobs) {
    for (const image of job.images) {
      images.push(toGalleryImage(image));
      if (images.length >= limit) return images;
    }
  }

  // Only backfill from other cities if this city has NO images at all
  if (images.length > 0) return images;

  for (const job of jobsForService(serviceSlug)) {
    if (job.citySlug === citySlug) continue;
    for (const image of job.images.slice(0, 2)) {
      const gi = toGalleryImage(image);
      images.push({
        ...gi,
        alt: stripCityFromText(gi.alt),
        caption: gi.caption ? stripCityFromText(gi.caption) : gi.caption,
      });
      if (images.length >= limit) return images;
    }
  }

  return images;
}

export function getServiceVideos(serviceSlug: string, limit = 6): GalleryVideo[] {
  const videos: GalleryVideo[] = [];
  for (const job of jobsForService(serviceSlug)) {
    for (const video of job.videos) {
      videos.push({
        src: video.src,
        alt: video.alt,
        poster: job.images[job.images.length - 1]?.src,
      });
      if (videos.length >= limit) return videos;
    }
  }
  return videos;
}

export function getCityServiceVideos(
  serviceSlug: string,
  citySlug: string,
  limit = 4,
): GalleryVideo[] {
  const cityJobs = jobsForCity(serviceSlug, citySlug);
  const videos: GalleryVideo[] = [];

  for (const job of cityJobs) {
    for (const video of job.videos) {
      videos.push({
        src: video.src,
        alt: video.alt,
        poster: job.images[0]?.src,
      });
      if (videos.length >= limit) return videos;
    }
  }

  if (videos.length > 0) return videos;
  return getServiceVideos(serviceSlug, limit);
}

function isCuratedProgressJob(job: MediaJob): boolean {
  if (job.images.length < 2) return false;

  const captions = job.images.map((image) => image.caption?.toLowerCase());
  if (job.images.length === 2) {
    return captions[0] === "before" && captions[1] === "after";
  }

  return (
    captions[0] === "before" &&
    captions[captions.length - 1] === "after" &&
    captions.slice(1, -1).every((caption) => caption === "during")
  );
}

function jobToProgressSet(job: MediaJob, city?: City): JobProgressSet | null {
  if (!isCuratedProgressJob(job) && job.id.startsWith("curated--")) {
    return null;
  }

  if (job.images.length < 2) return null;

  const cityName = city?.name ?? getCityBySlug(job.citySlug)?.name;
  const curatedLabel = getCuratedJobLabel(job);
  const label = curatedLabel
    ? curatedLabel
    : job.id.startsWith("curated--")
      ? job.id.includes("pool-leak-detection")
        ? `${cityName ?? "Central Texas"} leak repair`
        : (cityName ?? "Renovation project")
      : cityName
        ? `${formatJobLabel(job)} — ${cityName}`
        : formatJobLabel(job);

  if (job.images.length === 2) {
    return {
      id: job.id,
      label,
      cityName,
      before: toGalleryImage(job.images[0]),
      after: toGalleryImage(job.images[1]),
    };
  }

  const middleIndex = Math.floor(job.images.length / 2);
  return {
    id: job.id,
    label,
    cityName,
    before: toGalleryImage(job.images[0]),
    during: toGalleryImage(job.images[middleIndex]),
    after: toGalleryImage(job.images[job.images.length - 1]),
  };
}

function formatJobLabel(job: MediaJob): string {
  const [year, month, day] = job.date.split("-");
  if (!year || !month) return "Project";
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[Number(month) - 1]} ${day}, ${year}`;
}

export function getServiceProgressSets(serviceSlug: string, limit = 4): JobProgressSet[] {
  return jobsForService(serviceSlug)
    .map((job) => jobToProgressSet(job))
    .filter((set): set is JobProgressSet => set !== null)
    .slice(0, limit);
}

/** Labeled before / during / after sets for Austin, Cedar Park, and Westlake renovation pages. */
export function getFeaturedRenovationCollages(citySlug?: string): JobProgressSet[] {
  const slugs = citySlug
    ? featuredRenovationCollageCities.filter((slug) => slug === citySlug)
    : [...hubRenovationCollageCities];

  return slugs.flatMap((slug) => {
    const job = jobsForCity(renovationSlug, slug).find(
      (item) => item.id === `curated--${renovationSlug}--${slug}`,
    );
    if (!job) return [];
    const set = jobToProgressSet(job, getCityBySlug(slug));
    return set?.before && set.after ? [set] : [];
  });
}

export function getCityServiceProgressSets(
  serviceSlug: string,
  citySlug: string,
  city?: City,
  limit = 4,
): JobProgressSet[] {
  const citySets = jobsForCity(serviceSlug, citySlug)
    .map((job) => jobToProgressSet(job, city))
    .filter((set): set is JobProgressSet => set !== null);

  if (citySets.length >= limit) return citySets.slice(0, limit);

  const fallback = getServiceProgressSets(serviceSlug, limit)
    .filter((set) => !citySets.some((item) => item.id === set.id))
    .filter((set) => set.cityName === city?.name || !set.cityName)
    .slice(0, limit - citySets.length);

  return [...citySets, ...fallback];
}

export function getTeamGalleryImages(): GalleryImage[] {
  return jobsForService("team").flatMap((job) => job.images.map(toGalleryImage));
}

const HUB_GALLERY_SERVICES = [
  "pool-leak-detection",
  "pool-equipment-repair",
  "pool-renovations",
  "pool-inspections",
] as const;

export function getCityHubGalleryImages(citySlug: string, limit = 9): GalleryImage[] {
  const images: GalleryImage[] = [];

  for (const serviceSlug of HUB_GALLERY_SERVICES) {
    for (const image of getCityServiceGalleryImages(serviceSlug, citySlug, 12)) {
      if (images.some((item) => item.src === image.src)) continue;
      images.push(image);
      if (images.length >= limit) return images;
    }
  }

  return images;
}

const HUB_HERO_FIELD_PATTERNS = [
  "deck-excavation",
  "deck-cut",
  "wall-fitting",
  "electronic-detection",
  "pressure-testing",
  "pipe-camera",
  "underground-repair",
];

function hubHeroAlt(cityName: string, detail: string): string {
  return `${detail} in ${cityName}, TX — 911 Pool Care leak detection and repair`;
}

function getCityLeakFieldHero(citySlug: string): GalleryImage | undefined {
  const cityName = getCityBySlug(citySlug)?.name ?? citySlug;
  const fieldJob = jobsForCity("pool-leak-detection", citySlug).find(
    (job) => job.id === `curated--pool-leak-detection--field-${citySlug}`,
  );
  if (!fieldJob?.images.length) return undefined;

  const preferred = fieldJob.images.find((image) =>
    HUB_HERO_FIELD_PATTERNS.some((pattern) => image.src.includes(pattern)),
  );
  const pick = preferred ?? fieldJob.images[fieldJob.images.length - 1];

  return {
    src: pick.src,
    alt: pick.alt.includes(cityName)
      ? pick.alt
      : hubHeroAlt(cityName, pick.alt.replace(/ — .*$/, "")),
  };
}

export function getCityHubHeroImage(citySlug: string): GalleryImage | undefined {
  const hub = getCityHub(citySlug);
  const cityName = hub?.name ?? getCityBySlug(citySlug)?.name ?? citySlug;

  if (hub?.heroImage) return hub.heroImage;

  const leakHero = getCityLeakFieldHero(citySlug);
  if (leakHero) return leakHero;

  for (const serviceSlug of HUB_GALLERY_SERVICES) {
    if (serviceSlug === "pool-leak-detection") continue;

    const src = getCityServiceHeroImage(serviceSlug, citySlug);
    if (!src) continue;

    for (const job of jobsForCity(serviceSlug, citySlug)) {
      const match = job.images.find((image) => image.src === src);
      if (match) return toGalleryImage(match);
    }

    return {
      src,
      alt: hubHeroAlt(cityName, "Pool equipment repair and replacement"),
    };
  }

  const fallback = getServiceHeroImage("pool-leak-detection");
  if (!fallback) return undefined;

  return {
    src: fallback,
    alt: hubHeroAlt(cityName, "Pool leak detection and repair"),
  };
}
