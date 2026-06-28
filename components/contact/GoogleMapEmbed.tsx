import Link from "next/link";
import { formatGoogleReviewsLabel, site } from "@/content/site";

export function GoogleMapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <iframe
        title={`${site.name} service area map`}
        src={site.google.mapEmbedUrl}
        className="aspect-[4/3] w-full border-0 sm:aspect-[16/9]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <p className="border-t border-slate-200 px-4 py-3 text-center text-sm text-slate-600">
        <Link
          href={site.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          View on Google Maps · {formatGoogleReviewsLabel()}
        </Link>
      </p>
    </div>
  );
}
