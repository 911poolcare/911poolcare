"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { GoogleReview } from "@/content/testimonials";
import { site } from "@/content/site";
import { StarRating } from "@/components/home/StarRating";
import { cn } from "@/lib/utils";

type ReviewCarouselProps = {
  reviews: GoogleReview[];
};

const ROTATE_MS = 8000;

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (reviews.length === 0) return;
      setActiveIndex((index + reviews.length) % reviews.length);
    },
    [reviews.length],
  );

  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % reviews.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, reviews.length]);

  if (reviews.length === 0) return null;

  const activeReview = reviews[activeIndex];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:min-h-[200px] sm:p-8">
        {reviews.map((review, index) => (
          <figure
            key={`${review.name}-${index}`}
            className={cn(
              "transition-opacity duration-500",
              index === activeIndex
                ? "relative opacity-100"
                : "pointer-events-none absolute inset-6 opacity-0 sm:inset-8",
            )}
            aria-hidden={index !== activeIndex}
          >
            <Quote className="h-8 w-8 text-brand-400" aria-hidden />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StarRating rating={review.rating} />
              {review.highlight ? (
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {review.highlight}
                </span>
              ) : null}
            </div>
            <blockquote className="mt-4 text-lg leading-relaxed text-slate-700 sm:text-xl">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-slate-900">
              — {review.name}
              <span className="font-normal text-slate-500"> · Google review</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {reviews.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 shadow-sm transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 shadow-sm transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            {reviews.map((review, index) => (
              <button
                key={`${review.name}-dot-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  index === activeIndex
                    ? "bg-brand-700"
                    : "bg-brand-300 hover:bg-brand-500",
                )}
                aria-label={`Show review from ${review.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </>
      ) : null}

      <p className="mt-6 text-center text-sm text-slate-600">
        Showing {reviews.length} featured Google review{reviews.length === 1 ? "" : "s"} ·{" "}
        <Link
          href={site.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          See all {site.google.reviewCount.toLocaleString("en-US")} on Google
        </Link>
      </p>
    </div>
  );
}
