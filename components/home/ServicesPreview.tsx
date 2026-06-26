import Image from "next/image";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { poolCareOffering } from "@/content/service-offering";

import { services } from "@/content/services";

import { Container } from "@/components/ui/Container";

import { Section } from "@/components/ui/Section";

import { SectionHeading } from "@/components/ui/SectionHeading";



export function ServicesPreview() {

  return (

    <Section id="services" muted>

      <Container>

        <SectionHeading

          eyebrow="Our Services"

          title="Everything your pool needs — one team"

          description={`We handle ${poolCareOffering.inlineList}.`}

        />



        <div className="grid gap-5 sm:grid-cols-2">

          {services.map((service) => (

            <article

              key={service.slug}

              className="group overflow-hidden rounded-2xl border border-brand-300 bg-white shadow-sm ring-2 ring-brand-200 transition-shadow hover:shadow-md"

            >

              <Link href={`/services/${service.slug}`} className="block">

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

                  {service.slug === "pool-renovations" ? (

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-600">

                      Free consultation

                    </p>

                  ) : null}

                  <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">

                    {service.description}

                  </p>

                  <span className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-800">

                    Learn more

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />

                  </span>

                </div>

              </Link>

            </article>

          ))}

        </div>



        <p className="mt-8 text-center">

          <Link

            href="/services"

            className="text-sm font-semibold text-brand-700 hover:text-brand-800"

          >

            View all services →

          </Link>

        </p>

      </Container>

    </Section>

  );

}


