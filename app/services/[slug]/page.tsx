import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/content/services";
import { renovationSeo } from "@/content/renovations";
import { site } from "@/content/site";
import { ServicePageContent } from "@/components/services/ServicePageContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title =
    slug === "pool-renovations"
      ? renovationSeo.title
      : slug === "pool-leak-detection"
        ? "Pool Leak Detection & Repair Austin TX"
        : slug === "pool-equipment-repair"
          ? "Pool Equipment Repair & Replacement Austin TX"
          : service.title;

  return {
    title,
    description: service.metaDescription,
    keywords: slug === "pool-renovations"
      ? [
          "pool renovation Austin",
          "pool replastering Austin TX",
          "PebbleTec Austin",
          "pool remodel Central Texas",
          "pool resurfacing Georgetown",
        ]
      : slug === "pool-leak-detection"
        ? [
            "pool leak detection Austin",
            "pool leak repair Austin TX",
            "pool leak detection Central Texas",
            "swimming pool leak repair",
          ]
        : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description: service.metaDescription,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageContent service={service} />;
}
