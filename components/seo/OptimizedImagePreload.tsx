import { getImageProps } from "next/image";

type OptimizedImagePreloadProps = {
  src: string;
  sizes: string;
  width?: number;
  height?: number;
};

/**
 * Preload the Next.js-optimized image (WebP/AVIF srcset), not the raw public JPEG.
 * A raw `/images/...jpg` preload competes with LCP and often downloads a much larger file
 * than the `next/image` element actually paints.
 */
export function OptimizedImagePreload({
  src,
  sizes,
  width = 1600,
  height = 1200,
}: OptimizedImagePreloadProps) {
  if (!src) return null;

  const { props } = getImageProps({
    src,
    alt: "",
    width,
    height,
    sizes,
    priority: true,
  });

  return (
    <link
      rel="preload"
      as="image"
      href={props.src}
      imageSrcSet={props.srcSet}
      imageSizes={props.sizes}
      fetchPriority="high"
    />
  );
}
