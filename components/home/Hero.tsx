import Image from "next/image";
import { Phone, MessageSquare } from "lucide-react";
import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBadges } from "@/components/home/HeroBadges";
import { TrustBar } from "@/components/home/TrustBar";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />

      <Container className="relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
            Residential & Commercial · Central Texas
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {poolCareOffering.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100 sm:text-xl">
            {poolCareOffering.subhead}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {poolCareOffering.primary.map((service) => (
              <li
                key={service.slug}
                className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/20"
              >
                {service.label}
              </li>
            ))}
          </ul>

          <HeroBadges />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Phone className="h-5 w-5" aria-hidden />
              Call {site.phone}
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              <MessageSquare className="h-5 w-5" aria-hidden />
              Request Service
            </Button>
          </div>

          <p className="mt-5 text-sm text-brand-200">
            <strong className="text-white">Now growing in Austin & Georgetown</strong>
            {" · "}
            Leander · Round Rock · Cedar Park · Pflugerville
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-brand-950/30">
            <Image
              src={site.hero.src}
              alt={site.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 via-transparent to-transparent" />
          </div>
        </div>
      </Container>

      <TrustBar />
    </section>
  );
}
