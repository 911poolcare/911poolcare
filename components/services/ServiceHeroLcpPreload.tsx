import { OptimizedImagePreload } from "@/components/seo/OptimizedImagePreload";

/** Preload the service-page hero so LCP isn't fighting gallery images. */
export function ServiceHeroLcpPreload({ src }: { src: string }) {
  if (!src) return null;

  return (
    <OptimizedImagePreload
      src={src}
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );
}
