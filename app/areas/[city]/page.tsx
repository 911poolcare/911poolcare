import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities } from "@/content/cities";
import { getCityHub } from "@/content/city-hubs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCityServicePath } from "@/lib/local-seo";
import { CityHubContent } from "@/components/areas/CityHubContent";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const hub = getCityHub(citySlug);
  const city = cities.find((c) => c.slug === citySlug);

  if (hub) {
    return {
      title: `Pool Care ${hub.name} TX`,
      description: hub.metaDescription,
    };
  }

  if (city) {
    return {
      title: `Pool Services ${city.name} TX`,
      description: `Pool leak detection, repair, renovations, and inspections in ${city.name}, TX. Call ${site.phone}.`,
    };
  }

  return { title: "Area Not Found" };
}

function GenericCityPage({ cityName, citySlug }: { cityName: string; citySlug: string }) {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Service Area"
          title={`Pool care in ${cityName}, TX`}
          description={`${site.name} provides leak detection, equipment repair, renovations, and inspections throughout ${cityName} and surrounding Central Texas.`}
        />
        <ul className="mx-auto max-w-lg space-y-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={getCityServicePath(service.slug, citySlug)}
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 font-medium text-brand-700 shadow-sm hover:border-brand-200 hover:bg-brand-50"
              >
                {service.title} — {cityName}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default async function CityAreaPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const hub = getCityHub(citySlug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  if (hub) {
    return <CityHubContent hub={hub} />;
  }

  return <GenericCityPage cityName={city.name} citySlug={city.slug} />;
}
