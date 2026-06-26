import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { poolCareOffering } from "@/content/service-offering";
import { poolEquipment } from "@/content/equipment";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Pool Services",
  description: `Full-service pool care in Austin and Central Texas — ${poolCareOffering.inlineList}.`,
};

export default function ServicesIndexPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Full-service pool care"
          description={`We handle ${poolCareOffering.inlineList}.`}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
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
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-600">
          Browse by city on our{" "}
          <Link href="/areas" className="font-semibold text-brand-700 hover:text-brand-800">
            service areas page
          </Link>
          .
        </p>

        <p className="mt-4 text-center text-sm text-slate-600">
          Not sure which service you need?{" "}
          <Link href="/#contact" className="font-semibold text-brand-700 hover:text-brand-800">
            Contact us to schedule service
          </Link>{" "}
          or call{" "}
          <a href={site.phoneHref} className="font-semibold text-brand-700 hover:text-brand-800">
            {site.phone}
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
