import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, MessageSquare, MapPin } from "lucide-react";
import type { CityHub } from "@/content/city-hubs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getCityServicePath } from "@/lib/local-seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function CityHubContent({ hub }: { hub: CityHub }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <Container className="relative py-14 lg:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Service Areas", href: "/areas" },
              { label: hub.name },
            ]}
          />
          <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-200">
              <MapPin className="h-4 w-4" aria-hidden />
              {hub.name}, Texas
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {hub.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">{hub.intro}</p>
            <p className="mt-3 text-sm font-medium text-accent-400">{hub.responseTime}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} variant="secondary" size="lg">
                <Phone className="h-5 w-5" aria-hidden />
                Call {site.phone}
              </Button>
              <Button href="/#contact" variant="outline" size="lg">
                <MessageSquare className="h-5 w-5" aria-hidden />
                Request Service
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Why {hub.name} homeowners choose us
            </h2>
            <ul className="mt-6 space-y-4">
              {hub.whyLocal.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Neighborhoods we serve in {hub.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {hub.neighborhoods.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Don&apos;t see your neighborhood? Call us — we likely cover your area.
            </p>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Our services in {hub.name}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={getCityServicePath(service.slug, hub.slug)}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                    {service.title} — {hub.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
