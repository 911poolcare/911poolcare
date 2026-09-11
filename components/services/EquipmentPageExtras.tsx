import type { City } from "@/content/cities";
import { equipmentBrands, equipmentFaqs } from "@/content/equipment";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type EquipmentPageExtrasProps = {
  city?: City;
};

export function EquipmentPageExtras({ city }: EquipmentPageExtrasProps) {
  const areaLabel = city ? `${city.name} and surrounding areas` : "Austin and Central Texas";

  return (
    <>
      <FaqJsonLd items={equipmentFaqs} />
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Brands we service"
            title={`Pentair, Hayward, and Jandy equipment in ${areaLabel}`}
            description="Licensing comes first — then we diagnose the pad in front of us. We repair and replace common residential and commercial systems without pushing a replacement you do not need."
          />
          <ul className="flex flex-wrap justify-center gap-2">
            {equipmentBrands.map((brand) => (
              <li
                key={brand}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200"
              >
                {brand}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Equipment FAQ"
            title="Common pump, heater, and automation questions"
          />
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {equipmentFaqs.map((item) => (
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
