import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { partnerProgram } from "@/content/partners";
import { site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: partnerProgram.metaTitle,
  description: partnerProgram.metaDescription,
};

export default function PartnersPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 text-white sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            Pool Company Partners
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {partnerProgram.headline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">
            {partnerProgram.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Phone className="h-5 w-5" aria-hidden />
              Call {site.phone}
            </Button>
            <Button href="#partner-inquiry" variant="outline" size="lg">
              <MessageSquare className="h-5 w-5" aria-hidden />
              Partner Inquiry
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why partner with us"
            title="Pricing, scheduling, and support built for your business"
            description="Resell specialist pool services at competitive partner rates — with priority scheduling and a team that backs you up."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerProgram.benefits.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
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
            eyebrow="Services"
            title="What we handle for your customers"
            description="Refer us for the specialist jobs — we take it from there."
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {partnerProgram.services.map((service) => (
              <li
                key={service}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-800"
              >
                {service}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Simple referral process"
          />

          <ol className="grid gap-6 md:grid-cols-3">
            {partnerProgram.howItWorks.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {step.step}
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="partner-inquiry" muted>
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Get started"
            title="Request partner information"
            description="Tell us about your company and service area. We'll follow up to discuss how we can work together."
          />
          <ContactForm defaultService="pool-company-partner" variant="partner" />
          <p className="mt-6 text-center text-sm text-slate-600">
            Prefer to talk now?{" "}
            <Link href={site.phoneHref} className="font-semibold text-brand-700 hover:text-brand-800">
              Call {site.phone}
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
