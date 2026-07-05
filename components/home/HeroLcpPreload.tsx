import { siteHeroGallery } from "@/content/hero-images";

/** Preload homepage hero LCP image before React hydrates the carousel. */
export function HeroLcpPreload() {
  const src = siteHeroGallery[0]?.src;
  if (!src) return null;

  return <link rel="preload" as="image" href={src} fetchPriority="high" />;
}
