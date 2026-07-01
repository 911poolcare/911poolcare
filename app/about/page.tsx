import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { about } from "@/content/about";
import { footerCredentials } from "@/content/credentials";
import { getAboutGallery } from "@/content/galleries";
import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 text-white sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            About {site.name}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{about.headline}</h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">{about.subhead}</p>
          <p className="mt-4 text-lg leading-relaxed text-brand-100">{about.mission}</p>
        </Container>
      </section>

      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-5 text-base leading-relaxed text-slate-600">
            {about.story.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {about.credentials.map((item) => (
              <li
                key={item.label}
                className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-200"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Accredited & certified"
            title="Credentials you can verify"
            description="BBB accreditation, PHTA industry certifications, and Texas licensing — the same credentials shown on our legacy site and business profiles."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {footerCredentials.map((credential) => (
              <article
                key={credential.id}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                {credential.href ? (
                  <Link
                    href={credential.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-90"
                  >
                    <Image
                      src={credential.image.src}
                      alt={credential.image.alt}
                      width={credential.image.width}
                      height={credential.image.height}
                      className="h-20 w-auto object-contain"
                    />
                  </Link>
                ) : (
                  <Image
                    src={credential.image.src}
                    alt={credential.image.alt}
                    width={credential.image.width}
                    height={credential.image.height}
                    className="h-20 w-auto object-contain"
                  />
                )}
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  {credential.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {credential.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <PhotoGallery
        images={getAboutGallery()}
        title="Our team at work"
        description="A look at the leak, equipment, and renovation work we deliver across Central Texas."
        muted
      />

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="What sets us apart"
            description="Pool repair and renovation specialists — consistent quality, clear communication, and respect on every job."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {about.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Pool repair & renovation specialists"
            description={about.servicesIntro}
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {poolCareOffering.primary.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  {service.label}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section muted>
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Ready to work with a team that puts quality first?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Call or request service — we will walk you through options and next steps with clear
            communication from the start.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.phoneHref} size="lg">
              <Phone className="h-5 w-5" aria-hidden />
              Call {site.phone}
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              <MessageSquare className="h-5 w-5" aria-hidden />
              Request Service
            </Button>
          </div>
          <p className="mt-6">
            <a
              href={site.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              See our work on Google →
            </a>
          </p>
        </Container>
      </Section>
    </>
  );
}
