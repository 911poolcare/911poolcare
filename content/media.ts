import { curatedJobsByService } from "@/content/curated-jobs";
import type { City } from "@/content/cities";
import { getCityBySlug } from "@/content/cities";
import type { GalleryImage } from "@/content/galleries";
import { getServiceHeroPick } from "@/content/hero-images";
import { mediaJobs, type ManifestMedia, type MediaJob } from "@/content/generated/media-manifest";

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

export function getServiceGalleryImages(serviceSlug: string, limit = 12): GalleryImage[] {
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
  limit = 12,
): GalleryImage[] {
  const cityJobs = jobsForCity(serviceSlug, citySlug);
  const images: GalleryImage[] = [];

  for (const job of cityJobs) {
    for (const image of job.images) {
      images.push(toGalleryImage(image));
      if (images.length >= limit) return images;
    }
  }

  if (images.length >= limit) return images;

  for (const job of jobsForService(serviceSlug)) {
    if (job.citySlug === citySlug) continue;
    for (const image of job.images.slice(0, 2)) {
      images.push(toGalleryImage(image));
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

function jobToProgressSet(job: MediaJob, city?: City): JobProgressSet | null {
  if (job.images.length < 2) return null;

  const cityName = city?.name ?? getCityBySlug(job.citySlug)?.name;
  const label = job.id.startsWith("curated--")
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

export function getServiceProgressSets(serviceSlug: string, limit = 6): JobProgressSet[] {
  return jobsForService(serviceSlug)
    .map((job) => jobToProgressSet(job))
    .filter((set): set is JobProgressSet => set !== null)
    .slice(0, limit);
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
    .slice(0, limit - citySets.length);

  return [...citySets, ...fallback];
}

export function getTeamGalleryImages(): GalleryImage[] {
  return jobsForService("team").flatMap((job) => job.images.map(toGalleryImage));
}
