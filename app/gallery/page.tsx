import type { Metadata } from "next";
import { proof } from "@/content/proof";
import { site } from "@/content/site";
import { defaultOpenGraphImage } from "@/content/og-images";
import {
  getFeaturedRenovationCollages,
  getServiceGalleryImages,
  getServiceProgressSets,
} from "@/content/media";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { JobProgressGallery } from "@/components/gallery/JobProgressGallery";
import { RenovationCollage } from "@/components/gallery/RenovationCollage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Pool Repair & Renovation Gallery Austin TX",
  description:
    "Before-and-after pool renovations, leak repairs, and equipment work from 911 Pool Care across Austin and Central Texas.",
  alternates: {
    canonical: `${site.urls.site}/gallery`,
  },
  openGraph: {
    title: `Pool Repair & Renovation Gallery | ${site.name}`,
    description:
      "Before-and-after pool renovations, leak repairs, and equipment work across Central Texas.",
    url: `${site.urls.site}/gallery`,
    images: [defaultOpenGraphImage],
  },
};

export default function GalleryPage() {
  const collages = getFeaturedRenovationCollages();
  const renoProgress = getServiceProgressSets("pool-renovations", 6);
  const leakProgress = getServiceProgressSets("pool-leak-detection", 4);
  const leakPhotos = getServiceGalleryImages("pool-leak-detection", 8);
  const equipmentPhotos = getServiceGalleryImages("pool-equipment-repair", 8);

  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-14 text-white sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            Project gallery
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Leak repairs, equipment pads, and renovations — photographed on the job
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">
            {proof.documentedJobsLabel} — real Central Texas work, not a lifetime total. Renovations
            are leak-checked before plaster. Leak jobs are found and repaired by the same team.
          </p>
          <p className="mt-3 text-sm text-brand-200">{proof.documentedJobsNote}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="secondary" size="lg">
              Request service
            </Button>
            <Button href="/services/pool-renovations" variant="outline" size="lg">
              Pool renovations
            </Button>
          </div>
        </Container>
      </section>

      {collages.length > 0 ? <RenovationCollage sets={collages} /> : null}

      {renoProgress.length > 0 ? (
        <JobProgressGallery
          sets={renoProgress}
          title="More renovation projects"
          description="The same pool stripped, resurfaced, and finished — not a mix of random job photos."
        />
      ) : null}

      {leakProgress.length > 0 ? (
        <JobProgressGallery
          sets={leakProgress}
          title="Leak detection and repair"
          description="Locate, open the right spot, repair — often the same visit."
        />
      ) : null}

      {leakPhotos.length > 0 ? (
        <PhotoGallery
          images={leakPhotos}
          title="Leak work in the field"
          description="Dye testing, pressure testing, excavation, and finished plumbing repairs."
        />
      ) : null}

      {equipmentPhotos.length > 0 ? (
        <PhotoGallery
          images={equipmentPhotos}
          title="Equipment repair and replacement"
          muted={false}
          description="Pumps, heaters, filters, and pad upgrades across Central Texas."
        />
      ) : null}

      <Section>
        <Container className="max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">Need this on your pool?</h2>
          <p className="mt-3 text-slate-600">
            Call {site.phone} or send photos — we will tell you whether it is a leak, a pad repair,
            or a renovation.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.phoneHref} size="lg">
              Call {site.phone}
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-brand-700 text-brand-800 hover:bg-brand-50">
              Request service
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
