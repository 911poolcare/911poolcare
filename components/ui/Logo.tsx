import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: { width: 120, height: 94, imageClass: "h-9 w-auto" },
  md: { width: 222, height: 174, imageClass: "h-[4.125rem] w-auto sm:h-[4.5rem]" },
  lg: { width: 180, height: 141, imageClass: "h-14 w-auto" },
};

export function Logo({ className, size = "md", priority = false }: LogoProps) {
  const dimensions = sizes[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={site.logo.src}
        alt={site.name}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        className={cn(dimensions.imageClass, "object-contain")}
      />
    </Link>
  );
}
