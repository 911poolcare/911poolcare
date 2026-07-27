/** Preload the service-page hero so LCP isn't fighting gallery images. */
export function ServiceHeroLcpPreload({ src }: { src: string }) {
  if (!src) return null;

  return <link rel="preload" as="image" href={src} fetchPriority="high" />;
}
