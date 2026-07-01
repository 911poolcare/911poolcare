import Link from "next/link";
import type { City } from "@/content/cities";
import { cities } from "@/content/cities";
import {
  finishTypes,
  renovationFaqs,
  renovationFinishes,
  renovationFinishesIntro,
  renovationProcess,
  renovationSlug,
} from "@/content/renovations";
import { renovationShowcase } from "@/content/galleries";
import { getCityServiceProgressSets, getServiceProgressSets } from "@/content/media";
import { BeforeAfterGallery } from "@/components/gallery/BeforeAfterGallery";
import { JobProgressGallery } from "@/components/gallery/JobProgressGallery";
import { getCityServicePath } from "@/lib/local-seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type RenovationPageExtrasProps = {
  city?: City;
};

export function RenovationPageExtras({ city }: RenovationPageExtrasProps) {
  const areaLabel = city ? `${city.name} and surrounding areas` : "Central Texas";
  const progressSets = city
    ? getCityServiceProgressSets(renovationSlug, city.slug, city, 3)
    : getServiceProgressSets(renovationSlug, 4);

  return (
    <>
      {progressSets.length > 0 ? (
        <JobProgressGallery
          sets={progressSets}
          title={
            city
              ? `Renovation progress — ${city.name} pools`
              : "Renovation before, during & after"
          }
          description="Multiple photos from the same replaster or remodel job — stripped, resurfaced, and finished."
        />
      ) : null}

      <BeforeAfterGallery images={renovationShowcase} />

      <Section muted>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Finishes we install"
              title="Pool surface materials for renovations & replasters"
              description={renovationFinishesIntro}
              align="left"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {city
                ? `We help ${city.name}-area homeowners and property managers choose the right finish for their replaster or renovation — not a one-size-fits-all recommendation.`
                : "We help you choose the right finish for your replaster or renovation — not a one-size-fits-all recommendation."}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Materials we install in {areaLabel}
            </h3>
            <ul className="mt-4 space-y-4">
              {renovationFinishes.map((finish) => (
                <li key={finish.title}>
                  <p className="font-medium text-slate-900">{finish.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {finish.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Finishes & Services"
            title="Pool renovation options we provide"
            description="From replaster and premium finishes to tile, coping, and complete pool remodels."
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
