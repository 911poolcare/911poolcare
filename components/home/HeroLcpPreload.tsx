import { siteHeroGallery } from "@/content/hero-images";
import { OptimizedImagePreload } from "@/components/seo/OptimizedImagePreload";

/** Preload the optimized homepage hero image before the carousel hydrates. */
export function HeroLcpPreload() {
  const src = siteHeroGallery[0]?.src;
  if (!src) return null;

  return (
    <OptimizedImagePreload
      src={src}
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );
}
