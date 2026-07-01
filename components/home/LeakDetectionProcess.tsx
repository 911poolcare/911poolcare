import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { leakDetectionProcessIntro } from "@/content/leak-detection";
import { leakDetectionProcess } from "@/content/trust";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LeakDetectionProcess() {
  return (
    <Section id="leak-process">
      <Container>
        <SectionHeading
          eyebrow="Leak Detection"
          title="How our leak detection process works"
          description={leakDetectionProcessIntro}
        />

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leakDetectionProcess.map((step) => (
            <li
              key={step.step}
              className="relative rounded-2xl border border-brand-200 bg-brand-50/50 p-6"
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

        <p className="mt-8 text-center">
          <Link
            href="/services/pool-leak-detection"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Pool leak detection services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
