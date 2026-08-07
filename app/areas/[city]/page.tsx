import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, cityOffersService } from "@/content/cities";
import type { City } from "@/content/cities";
import { getCityHub } from "@/content/city-hubs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCityServicePath } from "@/lib/local-seo";
import { CityHubContent } from "@/components/areas/CityHubContent";
import { NearbyAreas } from "@/components/areas/NearbyAreas";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

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
      alternates: {
        canonical: `${site.urls.site}/areas/${hub.slug}`,
      },
      openGraph: {
        title: `Pool Care ${hub.name} TX | ${site.name}`,
        description: hub.metaDescription,
        url: `${site.urls.site}/areas/${hub.slug}`,
      },
    };
  }

  if (city) {
    const description = city.renovationsOnly
      ? `Pool renovations and replastering in ${city.name}, TX. PebbleTec, tile, coping & full remodels. Call ${site.phone}.`
      : `Pool leak detection, repair, renovations, and inspections in ${city.name}, TX. Call ${site.phone}.`;
    const canonical = `${site.urls.site}/areas/${city.slug}`;
    return {
      title: `Pool Services ${city.name} TX`,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title: `Pool Services ${city.name} TX | ${site.name}`,
        description,
        url: canonical,
      },
    };
  }

  return { title: "Area Not Found" };
}

function GenericCityPage({ city }: { city: City }) {
  const availableServices = services.filter((service) =>
    cityOffersService(city, service.slug),
  );

  return (
    <>
      <Section>
        <Container>
          <div className="mb-10 mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
              Service Area
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pool care in {city.name}, TX
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {city.renovationsOnly
                ? `${site.name} currently serves ${city.name} for pool renovations and replaster projects — PebbleTec, tile, coping, and full remodels.`
                : `${site.name} provides leak detection, equipment repair, renovations, and inspections throughout ${city.name} and surrounding Central Texas.`}
            </p>
          </div>
          <ul className="mx-auto max-w-lg space-y-3">
            {availableServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={getCityServicePath(service.slug, city.slug)}
                  className="block rounded-xl border border-slate-200 bg-white px-5 py-4 font-medium text-brand-700 shadow-sm hover:border-brand-200 hover:bg-brand-50"
                >
                  {service.title} — {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <NearbyAreas city={city} />
    </>
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

  return <GenericCityPage city={city} />;
}
