import type { City } from "@/content/cities";
import {
  getCityLeakDetectionFaqs,
  leakDetectionCertification,
  leakDetectionEquipmentBrands,
  leakDetectionFaqs,
  leakDetectionPhilosophy,
  leakDetectionTools,
  leakRepairTypes,
} from "@/content/leak-detection";
import { getTeamForService } from "@/content/team";
import { LeakRenoBridge } from "@/components/services/LeakRenoBridge";
import { TeamSection } from "@/components/team/TeamSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LeakDetectionPageExtrasProps = {
  city?: City;
};

export function LeakDetectionPageExtras({ city }: LeakDetectionPageExtrasProps) {
  const areaLabel = city ? `${city.name} and surrounding areas` : "Austin and Central Texas";
  const faqs = city
    ? getCityLeakDetectionFaqs(city.slug, city.name)
    : leakDetectionFaqs;
  const specialists = getTeamForService("pool-leak-detection");
  const repairTitle = city
    ? `Pool leak repair in ${city.name}`
    : "Pool leak repair in Austin";

  return (
    <>
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Find it, then fix it"
            title={repairTitle}
            description={`Pool leak repair is a specialty — not an add-on. After we confirm the source in ${areaLabel}, we repair plumbing leaks, shell leaks, fittings, and equipment-pad leaks so the pool holds water again.`}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {leakRepairTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="How we find leaks"
              title={leakDetectionCertification.title}
              description={leakDetectionCertification.description}
              align="left"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {leakDetectionEquipmentBrands}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {leakDetectionPhilosophy}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Detection methods we use in {areaLabel}
            </h3>
            <ul className="mt-4 space-y-4">
              {leakDetectionTools.map((tool) => (
                <li key={tool.title}>
                  <p className="font-medium text-slate-900">{tool.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {tool.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <TeamSection
        members={specialists}
        eyebrow="Your leak specialists"
        title="Named technicians on every leak repair"
        description="Danielle leads leak detection, electrical, and equipment work as our RAIL-certified Installer of Record. Steven handles leak detection and field repairs — so you know who's showing up."
      />

      <LeakRenoBridge from="leak" citySlug={city?.slug} />

      <Section muted>
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Pool leak repair FAQ"
            title={
              city
                ? `Common pool leak repair questions in ${city.name}`
                : "Common pool leak repair questions in Austin"
            }
          />
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((item) => (
              <div key={item.question} className="px-5 py-5 sm:px-6">
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
