import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const buttonStyles = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors bg-brand-700 text-white hover:bg-brand-800 shadow-sm shadow-brand-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors bg-accent-500 text-brand-950 hover:bg-accent-400 shadow-sm shadow-accent-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
  inline: "inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800",
  footer: "flex items-center gap-2 font-semibold text-white hover:text-accent-400",
} as const;

const sizes = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-2.5 text-base",
  lg: "min-h-14 px-6 py-3 text-base font-semibold sm:text-lg",
} as const;

type PhoneLinkProps = {
  variant?: keyof typeof buttonStyles;
  size?: keyof typeof sizes;
  className?: string;
  showIcon?: boolean;
  label?: string;
  compact?: boolean;
  ariaLabel?: string;
};

/** Server-rendered phone link so Google Ads call tracking can swap the number. */
export function PhoneLink({
  variant = "inline",
  size = "md",
  className,
  showIcon = false,
  label,
  compact = false,
  ariaLabel,
}: PhoneLinkProps) {
  const iconClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const displayText = compact
    ? (label ?? "Call")
    : label
      ? `${label} ${site.phone}`
      : site.phone;

  return (
    <a
      href={site.phoneHref}
      data-phone-placement={variant}
      aria-label={ariaLabel ?? (label ? `Call ${site.phone}` : undefined)}
      className={cn(
        buttonStyles[variant],
        variant !== "inline" && variant !== "footer" ? sizes[size] : undefined,
        "relative z-10 touch-manipulation",
        className,
      )}
    >
      {showIcon ? <Phone className={cn(iconClass, "shrink-0")} aria-hidden /> : null}
      {displayText}
    </a>
  );
}
