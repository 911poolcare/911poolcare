import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { City } from "@/content/cities";
import { getCredentialById } from "@/content/credentials";
import {
  inspectionAudience,
  inspectionAudienceNote,
  inspectionCertification,
  inspectionChecks,
  inspectionDeliverables,
  inspectionDeliverablesGoal,
  inspectionImportantNotes,
  inspectionPricing,
  inspectionRelatedServices,
} from "@/content/inspections";
import { site } from "@/content/site";
import {
  getCityServiceGalleryImages,
  getServiceGalleryImages,
} from "@/content/media";
import { Button } from "@/components/ui/Button";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type InspectionPageExtrasProps = {
  city?: City;
};

export function InspectionPageExtras({ city }: InspectionPageExtrasProps) {
  const areaLabel = city ? `${city.name} and surrounding areas` : "Central Texas";
  const inspectorCredential = getCredentialById("cpi");
  const galleryImages = city
    ? getCityServiceGalleryImages("pool-inspections", city.slug, 6)
    : getServiceGalleryImages("pool-inspections", 6);

  return (
    <>
      {galleryImages.length > 0 ? (
        <PhotoGallery
          images={galleryImages}
          title={
            city
              ? `On the job — ${city.name} pool inspections`
              : "Certified pool inspections in the field"
          }
          description={
            city
              ? `Professional on-site inspection work in ${city.name} — documented with photo evidence in your written report.`
              : "Professional on-site inspection work across Central Texas — documented with photo evidence in your written report."
          }
        />
      ) : null}

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Who it's for"
            title={`Pool inspections in ${areaLabel}`}
            description={inspectionAudienceNote}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {inspectionAudience.map((item) => (
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

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we check"
            title="What our pool inspection includes"
            description="Each inspection is thorough, professional, and documented with a written report."
          />
          <ul className="grid gap-4 lg:grid-cols-2">
            {inspectionChecks.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-brand-200 bg-brand-50/40 p-5"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  <span className="font-medium text-slate-700">Why it matters: </span>
                  {item.why}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section muted>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Your report"
              title="What you receive"
              description={inspectionDeliverablesGoal}
              align="left"
            />
            <ul className="space-y-3">
              {inspectionDeliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {inspectorCredential ? (
              <Image
                src={inspectorCredential.image.src}
                alt={inspectorCredential.image.alt}
                width={inspectorCredential.image.width}
                height={inspectorCredential.image.height}
                className="h-16 w-auto object-contain"
              />
            ) : null}
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {inspectionCertification.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {inspectionCertification.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Pool inspection pricing"
            description="$360 for a standard pool or pool/spa inspection. Exclusions apply — see notes below."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-brand-300 bg-brand-50 p-6 ring-2 ring-brand-200">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                {inspectionPricing.base.label}
              </p>
              <p className="mt-2 text-4xl font-bold text-slate-900">
                ${inspectionPricing.base.price}
              </p>
              <ul className="mt-5 space-y-2">
                {inspectionPricing.base.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-slate-600">
                {inspectionPricing.base.note}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {inspectionPricing.coldWaterAddOn.label}
              </p>
              <p className="mt-2 text-4xl font-bold text-slate-900">
                +${inspectionPricing.coldWaterAddOn.price}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                {inspectionPricing.coldWaterAddOn.description}
              </p>
            </article>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Good to know" title="Important notes about pool inspections" />
          <ul className="mt-6 space-y-3">
            {inspectionImportantNotes.map((note) => (
              <li key={note} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                {note}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Next steps"
            title="Related services"
            description="If issues are identified during the inspection, our team can handle the next steps without involving multiple contractors."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {inspectionRelatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-brand-700">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            Many clients appreciate working with one trusted company from inspection through repair.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.phoneHref} size="lg">
              Call {site.phone}
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              Schedule a Pool Inspection
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
