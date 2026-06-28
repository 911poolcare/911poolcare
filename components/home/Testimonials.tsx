import { getFeaturedGoogleReviews } from "@/content/testimonials";
import { GoogleRatingBadge } from "@/components/home/GoogleRatingBadge";
import { ReviewCarousel } from "@/components/home/ReviewCarousel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const reviews = getFeaturedGoogleReviews();

  return (
    <Section id="reviews">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="Trusted by homeowners and property pros"
          description="Real customers across Austin and Central Texas."
        />

        <div className="mb-10">
          <GoogleRatingBadge />
        </div>

        <ReviewCarousel reviews={reviews} />
      </Container>
    </Section>
  );
}
