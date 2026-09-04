import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCityBySlug, getCitiesForService, cityOffersService } from "@/content/cities";
import { resolveNestedWixCitySlug } from "@/content/legacy-redirects";
import { getServiceBySlug, getAllServiceSlugs } from "@/content/services";
import { leakDetectionSlug } from "@/content/leak-detection";
import { site } from "@/content/site";
import {
  getCityServiceMetaDescription,
  getCityServicePageTitle,
} from "@/lib/local-seo";
import { ServicePageContent } from "@/components/services/ServicePageContent";

type PageProps = {
  params: Promise<{ slug: string; city: string }>;
};

/** Unknown city slugs (legacy Wix nested URLs) still hit this page so we can 301 them. */
export const dynamicParams = true;

function resolveCityOrRedirect(slug: string, citySlug: string) {
  const city = getCityBySlug(citySlug);
  if (city && cityOffersService(city, slug)) {
    return city;
  }

  const nestedCity = resolveNestedWixCitySlug(slug, citySlug);
  if (nestedCity) {
    redirect(`/services/${slug}/${nestedCity}`);
  }

  return null;
}

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];

  for (const slug of getAllServiceSlugs()) {
    for (const city of getCitiesForService(slug)) {
      params.push({ slug, city: city.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Page Not Found" };
  }

  const city = resolveCityOrRedirect(slug, citySlug);
  if (!city) {
    return { title: "Page Not Found" };
  }

  const title = getCityServicePageTitle(service, city);
  const description = getCityServiceMetaDescription(service, city);
  const canonical = `${site.urls.site}/services/${slug}/${citySlug}`;

  return {
    title,
    description,
    keywords:
      slug === leakDetectionSlug
        ? [
            `pool leak repair ${city.name}`,
            `pool leak repair ${city.name} TX`,
            `pool leak detection ${city.name}`,
          ]
        : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: canonical,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

export default async function CityServicePage({ params }: PageProps) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const city = resolveCityOrRedirect(slug, citySlug);
  if (!city) {
    notFound();
  }

  return <ServicePageContent service={service} city={city} />;
}
