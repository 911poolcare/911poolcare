/** Curated Google reviews — run `npm run import:reviews` when a Places API key is set to refresh. */
export type ReviewServiceSlug =
  | "pool-leak-detection"
  | "pool-equipment-repair"
  | "pool-renovations"
  | "pool-inspections";

export type GoogleReview = {
  name: string;
  quote: string;
  rating: number;
  datePublished?: string;
  highlight?: string;
  /** Service pages this quote actually describes. Omit quotes that do not name the work. */
  services?: readonly ReviewServiceSlug[];
};

export const MIN_GOOGLE_REVIEW_RATING = 4;

export const googleReviews: GoogleReview[] = [
  {
    name: "Alejandro Alderete",
    rating: 5,
    quote:
      "I had 5 pool companies look at my pool and couldn't get it working. Chris diagnosed the issue right away and had my pool running in no time. He even walked me through maintaining the pool. Highly recommend!",
    highlight: "Diagnosed the issue right away",
    services: ["pool-equipment-repair"],
  },
  {
    name: "Ben Griffith",
    rating: 5,
    quote:
      "Top notch services all around. Their team has successfully detected pool leaks on many properties we service. Great communication, fair prices, and an overall great experience.",
    highlight: "Great communication, fair prices",
    services: ["pool-leak-detection"],
  },
  {
    name: "N R",
    rating: 5,
    quote:
      "Chris was extremely personable on the phone and immediately put me on their schedule. Reasonable estimate, work completed as soon as parts arrived. Beyond delighted with the professionalism and quality.",
    highlight: "Immediately put me on their schedule",
    services: ["pool-equipment-repair"],
  },
];

/** @deprecated Use `googleReviews` */
export const testimonials = googleReviews;

export type Testimonial = GoogleReview;

export function getFeaturedGoogleReviews(
  minRating: number = MIN_GOOGLE_REVIEW_RATING,
): GoogleReview[] {
  return googleReviews.filter((review) => review.rating >= minRating);
}

export function getReviewsForService(serviceSlug: string): GoogleReview[] {
  return googleReviews.filter((review) =>
    review.services?.includes(serviceSlug as ReviewServiceSlug),
  );
}
