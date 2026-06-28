import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function StarRating({
  rating,
  max = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of ${max} stars`}
    >
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= Math.round(rating)
              ? "fill-accent-500 text-accent-500"
              : "fill-slate-200 text-slate-200",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
