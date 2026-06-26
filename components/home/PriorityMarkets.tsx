import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { priorityCities } from "@/content/cities";
import { cityHubs } from "@/content/city-hubs";
import { services } from "@/content/services";
import { getCityHubPath, getCityServicePath } from "@/lib/local-seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PriorityMarkets() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Now Serving"
          title="Growing in Austin & Georgetown"
          description="We're investing in two of Central Texas's biggest pool markets — with faster scheduling, local crews, and the same quality that built our reputation."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {priorityCities.map((city) => {
            const hub = cityHubs[city.slug];
            if (!hub) return null;

            return (
              <article
                key={city.slug}
                className="flex flex-col rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{hub.name}, TX</h3>
                    <p className="mt-1 text-sm font-medium text-brand-700">
                      {hub.responseTime}
                    </p>
                  </div>
                </div>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
                  {hub.intro}
                </p>

                <ul className="mt-5 space-y-2">
                  {hub.whyLocal.slice(0, 3).map((item) => (
                    <li key={item} className="text-sm text-slate-700">
                      • {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={getCityHubPath(city.slug)} size="md">
                    Pool care in {hub.name}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button
                    href={getCityServicePath("pool-leak-detection", city.slug)}
                    variant="secondary"
                    size="md"
                  >
                    Leak detection
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Popular in Austin & Georgetown:{" "}
          {services.slice(0, 3).map((service, i) => (
            <span key={service.slug}>
              {i > 0 ? " · " : ""}
              <Link
                href={getCityServicePath(service.slug, "austin")}
                className="font-medium text-brand-700 hover:text-brand-800"
              >
                {service.title} Austin
              </Link>
            </span>
          ))}
          {" · "}
          <Link
            href={getCityServicePath("pool-leak-detection", "georgetown")}
            className="font-medium text-brand-700 hover:text-brand-800"
          >
            Leak Detection Georgetown
          </Link>
        </p>
      </Container>
    </Section>
  );
}
