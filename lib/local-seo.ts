import type { City } from "@/content/cities";
import type { Service } from "@/content/services";
import {
  cityRenovationIntros,
  cityRenovationMeta,
  renovationSeo,
  renovationSlug,
} from "@/content/renovations";
import { getCityHub } from "@/content/city-hubs";
import { site } from "@/content/site";

const cityServiceTitles: Record<string, string> = {
  "pool-leak-detection": "Pool Leak Detection & Repair",
  "pool-equipment-repair": "Pool Equipment Repair & Replacement",
  "pool-renovations": "Pool Renovation & Replastering",
  "pool-inspections": "Pool Inspections",
};

const priorityCityIntros: Record<string, Record<string, string>> = {
  austin: {
    "pool-leak-detection":
      "Austin pools lose water fast in summer — and a hidden leak can cost hundreds before you notice. We pinpoint leaks in the shell, plumbing, and equipment so you stop the waste and avoid structural damage.",
    "pool-equipment-repair":
      "From pump failures after heavy use to heater and filter issues, Austin pool equipment takes a beating. We repair pumps, filters, heaters, automation systems, pool lights, and more — correctly the first time.",
    "pool-renovations": cityRenovationIntros.austin,
    "pool-inspections":
      "Austin's competitive real estate market means pool inspections matter. We provide certified inspections with clear reports for buyers, sellers, and agents across the metro.",
  },
  georgetown: {
    "pool-leak-detection":
      "Georgetown's growth means more pools — and more leaks. If you're losing more than a quarter inch per day, we'll find the source and fix it before it becomes a bigger problem.",
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
  const label = cityServiceTitles[service.slug] ?? service.title;
  return `${label} in ${city.name}, TX`;
}

export function getCityServiceIntro(service: Service, city: City): string {
  const renovationIntro = cityRenovationIntros[city.slug];
  if (service.slug === renovationSlug && renovationIntro) {
    return `${renovationIntro} ${site.name} offers free renovation consultations throughout ${city.name} and nearby communities.`;
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
  const label = cityServiceTitles[service.slug] ?? service.title;
  return `${label} ${city.name} TX`;
}

export function getCityServicePath(serviceSlug: string, citySlug: string): string {
  return `/services/${serviceSlug}/${citySlug}`;
}

export function getCityHubPath(citySlug: string): string {
  return `/areas/${citySlug}`;
}
