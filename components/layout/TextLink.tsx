import { MessagesSquare } from "lucide-react";
import { site } from "@/content/site";
import { formatSmsHref } from "@/lib/sms-chat";
import { cn } from "@/lib/utils";

const buttonStyles = {
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors bg-brand-700 text-white hover:bg-brand-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
  inline: "inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800",
} as const;

const sizes = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-2.5 text-base",
  lg: "min-h-14 px-6 py-3 text-base font-semibold sm:text-lg",
} as const;

type TextLinkProps = {
  variant?: keyof typeof buttonStyles;
  size?: keyof typeof sizes;
  className?: string;
  showIcon?: boolean;
  label?: string;
  ariaLabel?: string;
};

/** Click-to-text link — opens the visitor's SMS app with your Quo number pre-filled. */
export function TextLink({
  variant = "inline",
  size = "md",
  className,
  showIcon = false,
  label = "Text us",
  ariaLabel,
}: TextLinkProps) {
  const iconClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <a
      href={formatSmsHref(site.smsDefaultBody)}
      data-sms-placement={variant}
      aria-label={ariaLabel ?? `Text ${site.phone}`}
      className={cn(
        buttonStyles[variant],
        variant !== "inline" ? sizes[size] : undefined,
        "relative z-10 touch-manipulation",
        className,
      )}
    >
      {showIcon ? <MessagesSquare className={cn(iconClass, "shrink-0")} aria-hidden /> : null}
      {label}
    </a>
  );
}
