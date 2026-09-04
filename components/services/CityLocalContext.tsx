import type { City } from "@/content/cities";
import { getCityHub } from "@/content/city-hubs";
import { getCityServiceLocal } from "@/content/city-service-local";
import type { Service } from "@/content/services";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type CityLocalContextProps = {
  city: City;
  service: Service;
};

export function CityLocalContext({ city, service }: CityLocalContextProps) {
  const local = getCityServiceLocal(city.slug, service.slug);
  if (!local) return null;

  const neighborhoods = getCityHub(city.slug)?.neighborhoods ?? [];

  return (
    <Section muted>
      {service.slug === "pool-equipment-repair" && local.faqs.length > 0 ? (
        <FaqJsonLd items={local.faqs} />
      ) : null}
      <Container className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Local to {city.name}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {local.title}
          </h2>
          <div className="mt-6 space-y-4">
            {local.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Pools we typically see in {city.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{local.typicalPools}</p>
          </div>
          {neighborhoods.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Neighborhoods we serve in {city.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {neighborhoods.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </Container>
      {service.slug === "pool-equipment-repair" && local.faqs.length > 0 ? (
        <Container className="mt-12 max-w-3xl">
          <h3 className="text-xl font-bold text-slate-900">
            Equipment repair questions in {city.name}
          </h3>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {local.faqs.map((item) => (
              <div key={item.question} className="px-5 py-5 sm:px-6">
                <h4 className="font-semibold text-slate-900">{item.question}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      ) : null}
    </Section>
  );
}
