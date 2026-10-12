import Link from "next/link";
import { StarRating } from "@/components/home/StarRating";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { getReviewsForService } from "@/content/testimonials";

const serviceQuoteLabels: Record<string, string> = {
  "pool-leak-detection": "leak detection",
  "pool-equipment-repair": "equipment repair",
  "pool-renovations": "renovation work",
  "pool-inspections": "pool inspections",
};

export function ServiceReviews({ serviceSlug }: { serviceSlug: string }) {
  const reviews = getReviewsForService(serviceSlug);
  if (reviews.length === 0) return null;

  const label = serviceQuoteLabels[serviceSlug] ?? "this service";

  return (
    <Section>
      <Container>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
          Google reviews
        </p>
        <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          What customers say about our {label}
        </h2>
        <ul
          className={
            reviews.length > 1 ? "mt-8 grid gap-5 lg:grid-cols-2" : "mt-8 grid max-w-3xl gap-5"
          }
        >
          {reviews.map((review) => (
            <li
              key={`${review.name}-${review.quote.slice(0, 24)}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-4 text-base leading-relaxed text-slate-700">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                — {review.name}
                <span className="font-normal text-slate-500"> · Google review</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-600">
          <Link
            href={site.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Read all {site.google.reviewCountLabel} reviews on Google
          </Link>
        </p>
      </Container>
    </Section>
  );
}
