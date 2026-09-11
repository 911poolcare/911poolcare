import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type LeakRenoBridgeProps = {
  /** Which side of the bridge this page is on */
  from: "leak" | "renovation";
  citySlug?: string;
};

export function LeakRenoBridge({ from, citySlug }: LeakRenoBridgeProps) {
  const leakHref = citySlug
    ? `/services/pool-leak-detection/${citySlug}`
    : "/services/pool-leak-detection";
  const renoHref = citySlug
    ? `/services/pool-renovations/${citySlug}`
    : "/services/pool-renovations";

  if (from === "leak") {
    return (
      <Section>
        <Container className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Leak found — surface worn?
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
            Diagnose the leak and renovate the pool — one team
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Cracks, delaminating plaster, and long-term water loss often go together. We find and
            repair the leak with Leaktronics-certified methods — and when the surface is ready for
            replaster or a full remodel, the same company handles the renovation with a dedicated
            project manager. No handoff to a second contractor.
          </p>
          <div className="mt-6">
            <Button href={renoHref} size="lg">
              Explore pool renovations
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
          Leak check before every plaster
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
          We leak-check every pool before we plaster
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Resurfacing over an active leak is a costly mistake. Every renovation pool is leak-checked
          first. If we find a plumbing or shell leak, our Leaktronics-certified technicians repair it
          before the new surface goes in — so your plaster, Pebble Tec, or Pebble Sheen finish is
          protecting a sound pool, not hiding a problem.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Prefer to start with detection?{" "}
          <Link href={leakHref} className="font-semibold text-brand-700 hover:text-brand-800">
            Pool leak repair & detection →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
