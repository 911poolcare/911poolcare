import type { MetadataRoute } from "next";
import { getAllCitySlugs, getCitiesForService } from "@/content/cities";
import { renovationSlug } from "@/content/renovations";
import { getAllServiceSlugs } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.urls.site;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/services/${renovationSlug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages = getAllServiceSlugs()
    .filter((slug) => slug !== renovationSlug)
    .map((slug) => ({
      url: `${base}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const renovationCityPages = getAllCitySlugs().map((city) => ({
    url: `${base}/services/${renovationSlug}/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const otherCityServicePages = getAllServiceSlugs()
    .filter((slug) => slug !== renovationSlug)
    .flatMap((slug) =>
      getCitiesForService(slug).map((city) => ({
        url: `${base}/services/${slug}/${city.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
    );

  const areaPages = getAllCitySlugs().map((city) => ({
    url: `${base}/areas/${city}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...renovationCityPages,
    ...otherCityServicePages,
    ...areaPages,
  ];
}
