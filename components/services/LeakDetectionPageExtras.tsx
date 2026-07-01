import type { City } from "@/content/cities";
import {
  leakDetectionCertification,
  leakDetectionEquipmentBrands,
  leakDetectionPhilosophy,
  leakDetectionTools,
} from "@/content/leak-detection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LeakDetectionPageExtrasProps = {
  city?: City;
};

export function LeakDetectionPageExtras({ city }: LeakDetectionPageExtrasProps) {
  const areaLabel = city ? `${city.name} and surrounding areas` : "Central Texas";

  return (
    <>
      <Section muted>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Certified & equipped"
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
    </>
  );
}
