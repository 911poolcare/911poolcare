import { ArrowRight, CreditCard } from "lucide-react";
import { financing } from "@/content/financing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FinancingCalloutProps = {
  className?: string;
};

export function FinancingCallout({ className }: FinancingCalloutProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8",
        className,
      )}
    >
      <div className="max-w-xl">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
          <CreditCard className="h-4 w-4" aria-hidden />
          {financing.heading}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {financing.body}
        </p>
        <p className="mt-2 text-sm text-slate-500">{financing.creditCardsNote}</p>
      </div>
      <Button href={financing.ctaHref} size="lg" className="w-full shrink-0 sm:w-auto">
        {financing.ctaLabel}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Button>
    </div>
  );
}
