import Link from "next/link";
import type { City } from "@/content/cities";
import { cities } from "@/content/cities";
import {
  finishTypes,
  renovationFaqs,
  renovationProcess,
  renovationSlug,
} from "@/content/renovations";
import { renovationShowcase } from "@/content/galleries";
import { BeforeAfterGallery } from "@/components/gallery/BeforeAfterGallery";
import { getCityServicePath } from "@/lib/local-seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type RenovationPageExtrasProps = {
  city?: City;
};

export function RenovationPageExtras({ city }: RenovationPageExtrasProps) {
  return (
    <>
      <BeforeAfterGallery images={renovationShowcase} />

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Finishes & Services"
            title="Pool renovation options we provide"
            description="From replaster and PebbleTec to tile, coping, and complete pool remodels."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {finishTypes.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Our Process"
            title="How a pool renovation works"
            description="Free consultation first — then a clear plan, professional execution, and a pool you'll want to show off."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {renovationProcess.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Renovation FAQ"
            title="Common pool renovation questions"
          />
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {renovationFaqs.map((item) => (
              <div key={item.question} className="px-5 py-5 sm:px-6">
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {!city ? (
        <Section muted>
          <Container>
            <SectionHeading
              eyebrow="Service Areas"
              title="Pool renovation near you"
              description="Local replaster and remodel pages across Central Texas."
            />
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={getCityServicePath(renovationSlug, area.slug)}
                    className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    Pool renovation — {area.name}, TX
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
