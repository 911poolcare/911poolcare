import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { partnerProgram } from "@/content/partners";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function PartnerSection() {
  return (
    <Section id="partners" className="border-y border-brand-200 bg-brand-50/60">
      <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
            <Handshake className="h-4 w-4" aria-hidden />
            For Pool Service Companies
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {partnerProgram.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {partnerProgram.intro}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {partnerProgram.benefits.slice(0, 3).map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-200"
              >
                {benefit.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Button href="/partners" size="lg">
            {partnerProgram.ctaLabel}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
          <Link
            href="/partners#partner-inquiry"
            className="inline-flex min-h-12 items-center justify-center text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Call or email to get started
          </Link>
        </div>
      </Container>
    </Section>
  );
}
