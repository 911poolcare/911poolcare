import Link from "next/link";
import type { City } from "@/content/cities";
import { getNearbyCities } from "@/content/cities";
import { getCityHubPath } from "@/lib/local-seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type NearbyAreasProps = {
  city: City;
  muted?: boolean;
};

/** Cross-links nearby /areas/[city] pages to improve crawl priority. */
export function NearbyAreas({ city, muted = true }: NearbyAreasProps) {
  const nearby = getNearbyCities(city.slug);
  if (nearby.length === 0) return null;

  return (
    <Section muted={muted}>
      <Container>
        <h2 className="text-2xl font-bold text-slate-900">
          Nearby service areas
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          We also serve communities near {city.name}. Jump to a local page for
          leak detection, equipment repair, renovations, and inspections.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {nearby.map((area) => (
            <li key={area.slug}>
              <Link
                href={getCityHubPath(area.slug)}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-800 ring-1 ring-brand-200 transition-colors hover:bg-brand-50"
              >
                {area.name}, TX
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
