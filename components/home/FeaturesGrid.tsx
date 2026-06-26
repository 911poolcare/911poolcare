import { features } from "@/content/features";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturesGrid() {
  return (
    <Section id="why-us">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Quality work and an experience you'll actually enjoy"
          description="911 Pool Care focuses on accurate diagnostics, clear communication, and results that last — for homeowners, realtors, and commercial properties."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
