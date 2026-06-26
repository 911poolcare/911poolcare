import Link from "next/link";
import { Quote, Star } from "lucide-react";
import { formatGoogleReviewsLabel, site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const featured = testimonials[0];

  return (
    <Section id="reviews">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="Trusted by homeowners and property pros"
          description="Real customers across Austin and Central Texas."
        />

        <p className="-mt-6 mb-8 text-center">
          <Link
            href={site.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <Star className="h-4 w-4 fill-accent-500 text-accent-500" aria-hidden />
            {formatGoogleReviewsLabel()}
          </Link>
        </p>

        {/* Featured testimonial — visible early for conversion */}
        <figure className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
          <Quote className="h-8 w-8 text-brand-400" aria-hidden />
          <blockquote className="mt-4 text-lg leading-relaxed text-slate-700 sm:text-xl">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-slate-900">
            — {featured.name}
          </figcaption>
        </figure>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(1).map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {item.highlight ? (
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {item.highlight}
                </p>
              ) : null}
              <blockquote className="text-sm leading-relaxed text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                — {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
