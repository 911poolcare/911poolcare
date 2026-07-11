import type { Metadata } from "next";
import Link from "next/link";
import { cities, cityOffersService } from "@/content/cities";
import { getHubCitySlugs, getCityHub } from "@/content/city-hubs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCityHubPath, getCityServicePath } from "@/lib/local-seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const hubCitySlugs = new Set(getHubCitySlugs());

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "911 Pool Care serves Austin, Georgetown, Round Rock, Cedar Park, Leander, Pflugerville, and surrounding Central Texas. Leak detection, repair, renovations & inspections.",
};

export default function AreasPage() {
  const featuredCities = cities.filter((city) => hubCitySlugs.has(city.slug));
  const otherCities = cities.filter((city) => !hubCitySlugs.has(city.slug));

  return (
    <>
      <Section className="bg-gradient-to-b from-brand-50 to-white">
        <Container>
          <SectionHeading
            eyebrow="Featured markets"
            title="Pool care in your city"
            description="Local leak detection, equipment repair, renovations, and inspections — with dedicated pages for the communities we serve most."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredCities.map((city) => {
              const hub = getCityHub(city.slug);
              if (!hub) return null;

              return (
                <div
                  key={city.slug}
                  className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-slate-900">{city.name}, TX</h2>
                  <p className="mt-2 text-sm text-brand-700">{hub.responseTime}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {hub.intro.slice(0, 200)}…
                  </p>
                  <Link
                    href={getCityHubPath(city.slug)}
                    className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    View {city.name} pool services →
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="All Service Areas"
            title="Pool repair across Central Texas"
            description="Find 911 Pool Care services in your city. Licensed, insured, and locally trusted."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherCities.map((city) => (
              <div
                key={city.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  <Link href={getCityHubPath(city.slug)} className="hover:text-brand-700">
                    {city.name}, TX
                  </Link>
                </h2>
                <ul className="mt-4 space-y-2">
                  {services
                    .filter((service) => cityOffersService(city, service.slug))
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={getCityServicePath(service.slug, city.slug)}
                          className="text-sm text-brand-700 hover:text-brand-800"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                </ul>
                {city.renovationsOnly ? (
                  <p className="mt-3 text-xs text-slate-500">
                    Renovations & replaster only in this area for now.
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate-600">
            Don&apos;t see your city? We serve many communities across Central Texas.{" "}
            <Link href="/contact" className="font-semibold text-brand-700 hover:text-brand-800">
              Contact us
            </Link>{" "}
            to confirm coverage.
          </p>
        </Container>
      </Section>
    </>
  );
}
