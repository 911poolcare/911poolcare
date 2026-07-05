"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroImage } from "@/content/hero-images";

type HeroImageRotatorProps = {
  images: HeroImage[];
  priority?: boolean;
};

const ROTATE_MS = 3000;

export function HeroImageRotator({ images, priority = true }: HeroImageRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;

    const next = images[(activeIndex + 1) % images.length];
    if (!next) return;

    const preload = new window.Image();
    preload.src = next.src;
  }, [activeIndex, images]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-brand-950/30">
      <Image
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        fill
        priority={priority && activeIndex === 0}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
      {activeImage.href ? (
        <Link
          href={activeImage.href}
          className="absolute inset-0 z-[1] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
          aria-label={`View ${activeImage.label ?? "service"} details`}
        />
      ) : null}
      {activeImage.label ? (
        <p className="pointer-events-none absolute bottom-10 left-4 z-[2] rounded-full bg-brand-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {activeImage.label}
        </p>
      ) : null}
      {images.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={
                image.label ? `Show ${image.label} photo` : `Show hero photo ${index + 1}`
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
