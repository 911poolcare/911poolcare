import type { City } from "@/content/cities";
import type { Service } from "@/content/services";
import { getCityServiceLocal } from "@/content/city-service-local";
import {
  getCityLeakDetectionIntro,
  getCityLeakDetectionMeta,
  leakDetectionSeo,
  leakDetectionSlug,
} from "@/content/leak-detection";
import {
  cityRenovationIntros,
  cityRenovationMeta,
  renovationSeo,
  renovationSlug,
} from "@/content/renovations";
import { getCityHub } from "@/content/city-hubs";
import { site } from "@/content/site";

const cityServiceTitles: Record<string, string> = {
  "pool-leak-detection": "Pool Leak Repair & Detection",
  "pool-equipment-repair": "Pool Equipment Repair & Replacement",
  "pool-renovations": "Pool Renovation & Replastering",
  "pool-inspections": "Pool Inspections",
};

const priorityCityIntros: Record<string, Record<string, string>> = {
  austin: {
    "pool-equipment-repair":
      "From pump failures after heavy use to heater and filter issues, Austin pool equipment takes a beating. We repair pumps, filters, heaters, automation systems, pool lights, and more — correctly the first time.",
    "pool-renovations": cityRenovationIntros.austin,
    "pool-inspections":
      "Austin's competitive real estate market means pool inspections matter. We provide certified inspections with clear reports for buyers, sellers, and agents across the metro.",
  },
  georgetown: {
    "pool-equipment-repair":
      "Whether it's a Sun City community pool or a backyard oasis in Wolf Ranch, we repair pool pumps, filters, heaters, automation systems, lights, and related equipment throughout Georgetown.",
    "pool-renovations": cityRenovationIntros.georgetown,
    "pool-inspections":
      "Buying or selling in Georgetown? Our certified inspectors provide detailed pool reports so transactions move forward with confidence.",
  },
};

export function getCityServiceHeadline(service: Service, city: City): string {
  if (service.slug === renovationSlug) {
    return `Pool Renovation & Replastering in ${city.name}, TX`;
  }
  if (service.slug === leakDetectionSlug) {
    return leakDetectionSeo.cityHeadline(city.name);
  }
  const label = cityServiceTitles[service.slug] ?? service.title;
  return `${label} in ${city.name}, TX`;
}

export function getCityServiceHighlights(service: Service, city?: City): string[] {
  if (!city) return service.highlights;
  const local = getCityServiceLocal(city.slug, service.slug);
  return local?.highlights ?? service.highlights;
}

export function getCityServiceIntro(service: Service, city: City): string {
  const local = getCityServiceLocal(city.slug, service.slug);
  if (local?.heroIntro) {
    return local.heroIntro;
  }

  if (service.slug === renovationSlug && cityRenovationIntros[city.slug]) {
    return `${cityRenovationIntros[city.slug]} ${site.name} offers free renovation consultations throughout ${city.name} and nearby communities.`;
  }

  if (service.slug === leakDetectionSlug) {
    return getCityLeakDetectionIntro(city.slug, city.name);
  }

  const priorityIntro = priorityCityIntros[city.slug]?.[service.slug];
  if (priorityIntro) {
    return `${priorityIntro} ${site.name} serves homeowners and realtors throughout ${city.name} and surrounding communities.`;
  }
  return `Homeowners and realtors in ${city.name} trust ${site.name} for ${service.title.toLowerCase()}. ${service.intro}`;
}

export function getCityServiceMetaDescription(service: Service, city: City): string {
  if (service.slug === renovationSlug) {
    return (
      cityRenovationMeta[city.slug] ??
      `Pool renovation & replastering in ${city.name}, TX. PebbleTec, tile, coping & full remodels. Free consultation. Call ${site.phone}.`
    );
  }

  if (service.slug === leakDetectionSlug) {
    return getCityLeakDetectionMeta(city.slug, city.name);
  }

  const label = cityServiceTitles[service.slug] ?? service.title;
  const hub = getCityHub(city.slug);
  if (hub) {
    return `${label} in ${city.name}, TX — ${hub.responseTime.toLowerCase()}. Licensed, insured. Call ${site.phone}.`;
  }
  return `${label} in ${city.name}, TX. Licensed, insured, and locally trusted. Call ${site.phone}.`;
}

export function getCityServicePageTitle(service: Service, city: City): string {
  if (service.slug === renovationSlug) {
    return renovationSeo.titleTemplate(city.name);
  }
  if (service.slug === leakDetectionSlug) {
    return leakDetectionSeo.titleTemplate(city.name);
  }
  const label = cityServiceTitles[service.slug] ?? service.title;
  return `${label} ${city.name} TX`;
}

export function getCityServicePath(serviceSlug: string, citySlug: string): string {
  return `/services/${serviceSlug}/${citySlug}`;
}

export function getCityHubPath(citySlug: string): string {
  return `/areas/${citySlug}`;
}
