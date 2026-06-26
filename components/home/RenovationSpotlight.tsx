import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  priorityRenovationMarkets,
  renovationSeo,
} from "@/content/renovations";
import { pricing } from "@/content/pricing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function RenovationSpotlight() {
  return (
    <Section id="renovations" className="border-y border-brand-200 bg-gradient-to-br from-brand-50 to-white">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
            <Sparkles className="h-4 w-4" aria-hidden />
            Pool Renovations
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Replaster, PebbleTec & full pool remodels
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {renovationSeo.hubDescription} {pricing.renovation.consultationDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {priorityRenovationMarkets.map((city) => (
              <Link
                key={city.slug}
                href={`/services/pool-renovations/${city.slug}`}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-200 transition-colors hover:bg-brand-100"
              >
                {city.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/services/pool-renovations" size="lg">
              Pool renovation services
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              Free renovation consultation
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Replaster & resurfacing",
            "PebbleTec finishes",
            "Tile & coping",
            "Full pool remodels",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm"
            >
              <p className="font-semibold text-slate-900">{item}</p>
              <p className="mt-1 text-sm text-slate-600">
                Residential & commercial across Central Texas
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
