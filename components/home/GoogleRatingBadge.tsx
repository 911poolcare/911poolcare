import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@/content/site";
import { StarRating } from "@/components/home/StarRating";

export function GoogleRatingBadge() {
  const { rating, reviewCount } = site.google;

  return (
    <Link
      href={site.google.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-auto flex max-w-md flex-col items-center rounded-2xl border border-brand-200 bg-white px-8 py-7 text-center shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div className="flex items-center gap-3">
        <Star className="h-10 w-10 fill-accent-500 text-accent-500" aria-hidden />
        <span className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          {rating.toFixed(1)}
        </span>
      </div>
      <StarRating rating={rating} size="lg" className="mt-3" />
      <p className="mt-3 text-lg font-semibold text-slate-900">
        {reviewCount.toLocaleString("en-US")} Google reviews
      </p>
      <p className="mt-1 flex items-center gap-1 text-sm font-medium text-brand-700 group-hover:text-brand-800">
        Read reviews on Google Maps
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </p>
    </Link>
  );
}
