import Image from "next/image";
import type { ShowcaseImage } from "@/content/galleries";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type BeforeAfterGalleryProps = {
  images: ShowcaseImage[];
};

export function BeforeAfterGallery({ images }: BeforeAfterGalleryProps) {
  if (images.length === 0) return null;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Before & after"
          title="Real renovation results"
          description="Side-by-side project photos from replaster and renovation jobs across Central Texas."
        />
        <ul className="grid gap-6 lg:grid-cols-3">
          {images.map((image) => (
            <li
              key={image.src}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5] bg-slate-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                {image.label ? (
                  <p className="text-sm font-semibold text-brand-700">{image.label}</p>
                ) : null}
                {image.caption ? (
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{image.caption}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
