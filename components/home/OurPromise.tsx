import { ourPromise } from "@/content/trust";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function OurPromise() {
  return (
    <Section muted>
      <Container>
        <SectionHeading
          eyebrow="Our Promise"
          title="Accountable service you can count on"
          description="Leak detection technicians. Pool repair experts. Renovation specialists. Clear pricing. No weekly cleaning routes."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ourPromise.map((item) => (
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
  );
}
