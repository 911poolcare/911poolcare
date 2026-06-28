import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getCitiesForService, cityOffersService } from "@/content/cities";
import { getServiceBySlug, getAllServiceSlugs } from "@/content/services";
import { site } from "@/content/site";
import {
  getCityServiceMetaDescription,
  getCityServicePageTitle,
} from "@/lib/local-seo";
import { ServicePageContent } from "@/components/services/ServicePageContent";

type PageProps = {
  params: Promise<{ slug: string; city: string }>;
};

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
  const city = getCityBySlug(citySlug);

  if (!service || !city || !cityOffersService(city, slug)) {
    return { title: "Page Not Found" };
  }

  const title = getCityServicePageTitle(service, city);
  const description = getCityServiceMetaDescription(service, city);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function CityServicePage({ params }: PageProps) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);

  if (!service || !city || !cityOffersService(city, slug)) {
    notFound();
  }

  return <ServicePageContent service={service} city={city} />;
}
