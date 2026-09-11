import type { Metadata } from "next";
import { sampleInspectionReport } from "@/content/inspections";
import { site } from "@/content/site";
import { defaultOpenGraphImage } from "@/content/og-images";
import { PrintReportButton } from "@/components/inspections/PrintReportButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sample Pool Inspection Report Austin TX",
  description: sampleInspectionReport.metaDescription,
  alternates: {
    canonical: `${site.urls.site}/resources/sample-pool-inspection-report`,
  },
  openGraph: {
    title: `Sample Pool Inspection Report | ${site.name}`,
    description: sampleInspectionReport.metaDescription,
    url: `${site.urls.site}/resources/sample-pool-inspection-report`,
    images: [defaultOpenGraphImage],
  },
};

export default function SampleInspectionReportPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 text-white sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            For buyers, sellers & realtors
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {sampleInspectionReport.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">
            {sampleInspectionReport.disclaimer}
          </p>
          <p className="mt-6 hidden text-sm print:block">
            {site.name} · Sample report for illustration · not a real property
          </p>
        </Container>
      </section>

      <Section>
        <Container className="max-w-3xl">
          <dl className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-900">Property</dt>
              <dd className="mt-1 text-slate-600">{sampleInspectionReport.property}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Inspector</dt>
              <dd className="mt-1 text-slate-600">{sampleInspectionReport.inspector}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Typical fee</dt>
              <dd className="mt-1 text-slate-600">{sampleInspectionReport.fee}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Not included</dt>
              <dd className="mt-1 text-slate-600">{sampleInspectionReport.notIncluded}</dd>
            </div>
          </dl>

          <ol className="mt-10 space-y-6">
            {sampleInspectionReport.sections.map((section, index) => (
              <li
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  {index + 1} of 7
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.finding}</p>
                <p className="mt-3 text-sm font-medium text-slate-800">
                  Typical note: {section.priority}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 print:hidden sm:flex-row">
            <Button href="/contact" size="lg">
              Schedule a pool inspection
            </Button>
            <Button href="/services/pool-inspections" variant="outline" size="lg" className="border-brand-700 text-brand-800 hover:bg-brand-50">
              Inspection services
            </Button>
            <PrintReportButton />
          </div>
        </Container>
      </Section>
    </>
  );
}
