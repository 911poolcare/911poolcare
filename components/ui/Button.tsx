import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  asChild?: boolean;
};

const variants = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 shadow-sm shadow-brand-900/10",
  secondary:
    "bg-accent-500 text-brand-950 hover:bg-accent-400 shadow-sm shadow-accent-600/20",
  outline:
    "border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
};

const sizes = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-2.5 text-base",
  lg: "min-h-14 px-6 py-3 text-base font-semibold sm:text-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
