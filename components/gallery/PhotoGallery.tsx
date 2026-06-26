"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/content/galleries";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PhotoGalleryProps = {
  images: GalleryImage[];
  title?: string;
  description?: string;
  muted?: boolean;
};

export function PhotoGallery({
  images,
  title = "Our work",
  description = "Recent projects from our team across Central Texas.",
  muted = true,
}: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? null : (index + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  if (images.length === 0) return null;

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <Section muted={muted}>
        <Container>
          <SectionHeading eyebrow="Project photos" title={title} description={description} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative block w-full overflow-hidden rounded-xl bg-slate-100 text-left ring-1 ring-slate-200 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  {image.caption ? (
                    <p className="px-3 py-2 text-xs text-slate-600">{image.caption}</p>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div className="relative max-h-[85vh] w-full max-w-5xl">
            <div className="relative aspect-[4/3] max-h-[85vh] w-full">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/90">{activeImage.alt}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
