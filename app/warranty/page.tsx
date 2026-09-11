import type { Metadata } from "next";
import { warrantyPage } from "@/content/warranty";
import { site } from "@/content/site";
import { defaultOpenGraphImage } from "@/content/og-images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: warrantyPage.metaTitle,
  description: warrantyPage.metaDescription,
  alternates: {
    canonical: `${site.urls.site}/${warrantyPage.slug}`,
  },
  openGraph: {
    title: `${warrantyPage.metaTitle} | ${site.name}`,
    description: warrantyPage.metaDescription,
    url: `${site.urls.site}/${warrantyPage.slug}`,
    images: [defaultOpenGraphImage],
  },
};

export default function WarrantyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 text-white sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            Renovations
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {warrantyPage.headline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">{warrantyPage.intro}</p>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-3">
          {[warrantyPage.workmanship, warrantyPage.manufacturer, warrantyPage.leakCheck].map(
            (item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ),
          )}
        </Container>
      </Section>

      <Section muted>
        <Container className="max-w-2xl text-center">
          <SectionHeading
            title="Free renovation consultation"
            description="We will explain finish options, leak-check, and what warranty applies to your pool — no pressure."
          />
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Request a consultation
            </Button>
            <Button href="/services/pool-renovations" variant="outline" size="lg" className="border-brand-700 text-brand-800 hover:bg-brand-50">
              Renovation services
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
