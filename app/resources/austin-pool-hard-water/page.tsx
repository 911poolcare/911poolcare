import type { Metadata } from "next";
import { resourcePages } from "@/content/resources";
import { site } from "@/content/site";
import { defaultOpenGraphImage } from "@/content/og-images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const page = resourcePages.hardWater;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: {
    canonical: `${site.urls.site}/resources/${page.slug}`,
  },
  openGraph: {
    title: `${page.metaTitle} | ${site.name}`,
    description: page.metaDescription,
    url: `${site.urls.site}/resources/${page.slug}`,
    images: [defaultOpenGraphImage],
  },
};

export default function AustinHardWaterPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 text-white sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            Resources
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{page.headline}</h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">{page.intro}</p>
        </Container>
      </section>

      <Section>
        <Container className="max-w-3xl space-y-10">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{section.body}</p>
            </article>
          ))}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/services/pool-renovations" size="lg">
              Pool renovations
            </Button>
            <Button href="/warranty" variant="outline" size="lg" className="border-brand-700 text-brand-800 hover:bg-brand-50">
              Finish warranty
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
