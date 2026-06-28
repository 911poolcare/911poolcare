import Link from "next/link";
import { Star, Shield, Medal, Zap } from "lucide-react";
import { formatGoogleReviewsLabel, site } from "@/content/site";
export function HeroBadges() {
  return (
    <ul className="mt-5 flex flex-wrap items-center gap-2">
      <li>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20">
          <Medal className="h-4 w-4 text-accent-400" aria-hidden />
          {site.veteranOwned.label}
        </span>
      </li>
      <li>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20"
          title={site.railCertified.fullName}
        >
          <Zap className="h-4 w-4 text-accent-400" aria-hidden />
          {site.railCertified.label}
        </span>
      </li>
      <li>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20">
          <Shield className="h-4 w-4" aria-hidden />
          Licensed & Insured
        </span>
      </li>
      <li>
        <Link
          href={site.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/25"
        >
          <Star className="h-4 w-4 fill-accent-400 text-accent-400" aria-hidden />
          {formatGoogleReviewsLabel()}
        </Link>
      </li>
    </ul>
  );
}
