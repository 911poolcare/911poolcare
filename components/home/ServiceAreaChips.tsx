import Link from "next/link";
import { trackedMarketCities } from "@/content/cities";
import { getCityHubPath } from "@/lib/local-seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/** Homepage links to primary service-area hubs for SEO crawl depth. */
export function ServiceAreaChips() {
  return (
    <Section muted className="py-10 sm:py-12">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-brand-700">
          Service areas
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Pool services across Central Texas
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Leak detection, equipment repair, renovations, and inspections in the
          communities we serve most.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {trackedMarketCities.map((city) => (
            <li key={city.slug}>
              <Link
                href={getCityHubPath(city.slug)}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-800 ring-1 ring-brand-200 transition-colors hover:bg-brand-50"
              >
                {city.name}, TX
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/areas"
              className="inline-flex min-h-11 items-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              All areas →
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
