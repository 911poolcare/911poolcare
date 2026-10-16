import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Droplets, PawPrint, Phone, Receipt, Unlock } from "lucide-react";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { TextLink } from "@/components/layout/TextLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cities } from "@/content/cities";
import { defaultOpenGraphImage } from "@/content/og-images";
import {
  poolStartupGuide,
  startupBeforeFill,
  startupCallIf,
  startupDonts,
  startupFillRules,
  startupNormal,
  startupToc,
  startupVisits,
} from "@/content/pool-startup";
import { renovationSlug } from "@/content/renovations";
import { site } from "@/content/site";
import { getCityServicePath } from "@/lib/local-seo";
import { formatSmsHref } from "@/lib/sms-chat";

const beforeFillIcons = [Unlock, PawPrint, Droplets, Receipt] as const;
const renovationPath = `/services/${renovationSlug}`;
const fullSmsHref = formatSmsHref("The pool is full and ready for the first startup visit.");

export const metadata: Metadata = {
  title: poolStartupGuide.metaTitle,
  description: poolStartupGuide.metaDescription,
  alternates: {
    canonical: `${site.urls.site}${poolStartupGuide.href}`,
  },
  openGraph: {
    title: `${poolStartupGuide.metaTitle} | ${site.name}`,
    description: poolStartupGuide.metaDescription,
    url: `${site.urls.site}${poolStartupGuide.href}`,
    images: [defaultOpenGraphImage],
  },
};

export default function PoolStartupGuidePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Pool renovations", href: renovationPath },
                { label: "Startup guide", href: poolStartupGuide.href },
              ]}
            />
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">
              {poolStartupGuide.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {poolStartupGuide.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">
              Your new plaster is curing, and the first few weeks decide how it looks and lasts
              for years. We use the <strong className="font-semibold text-white">Orenda Startup method</strong>,
              with brushing and equipment timing that meet or exceed{" "}
              <strong className="font-semibold text-white">National Plasterers Council (NPC)</strong>{" "}
              guidelines. Our team handles the water chemistry through 6 visits over 2 weeks, but a
              few important steps are up to you. Here&apos;s what we do, what we need from you, and
              what&apos;s normal.
            </p>
            <p className="mt-4 text-sm text-brand-100">
              This is the handoff after a{" "}
              <Link
                href={renovationPath}
                className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                pool renovation or replaster
              </Link>
              .
            </p>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
              {startupToc.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/20">
              <Image
                src={poolStartupGuide.image.src}
                alt={poolStartupGuide.image.alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-brand-100">
              Fill day: hoses stay in the deep end, with cloth wraps on the ends so the flow
              doesn&apos;t mark the plaster.
            </figcaption>
          </figure>
        </Container>
      </section>

      <div className="border-b border-brand-200 bg-brand-50">
        <Container className="py-4 text-sm font-semibold text-brand-900 sm:text-base">
          {poolStartupGuide.dayCountNote}
        </Container>
      </div>

      <Section id="before-fill" className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Before Fill Day</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {startupBeforeFill.map((item, index) => {
              const Icon = beforeFillIcons[index];
              return (
                <li
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-brand-700" aria-hidden />
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </li>
              );
            })}
          </ul>
          </div>
        </Container>
      </Section>

      <Section id="fill-day" muted className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Fill Day: Your Most Important Job
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Once the plaster is installed, our plaster team starts filling the pool.{" "}
            <strong className="font-semibold text-slate-900">
              From that point, you&apos;re responsible for watching the fill and turning off the
              water when the pool is full.
            </strong>
          </p>
          <ol className="mt-8 space-y-4">
            {startupFillRules.map((rule, index) => (
              <li
                key={rule.lead}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {rule.lead}{"continued" in rule ? "" : "."}
                  </span>{" "}
                  {"textWhenFull" in rule ? (
                    <>
                      Then text us at{" "}
                      <a
                        href={fullSmsHref}
                        className="font-semibold text-brand-700 hover:text-brand-800"
                      >
                        {site.phone}
                      </a>{" "}
                      so we can schedule your first visit.
                    </>
                  ) : (
                    rule.body
                  )}
                </p>
              </li>
            ))}
          </ol>
          </div>
        </Container>
      </Section>

      <Section id="brushing" className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 px-6 py-8 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Your job for the first 2 weeks
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Brush twice a day
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Brush the entire pool{" "}
              <strong className="font-semibold text-slate-900">
                at least twice a day for 14 days
              </strong>
              : walls, floor, steps, and benches. Brushing clears dust and debris off the surface
              before it can settle and harden, and it&apos;s the biggest factor in how smooth and
              even your finish turns out. We brush on our visits too, but daily brushing in
              between is up to you.
            </p>
          </div>
          </div>
        </Container>
      </Section>

      <Section id="visits" muted className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Weeks 1–2: Our Startup Visits
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">What we do on each of the 6 startup visits</caption>
              <thead className="bg-brand-800 text-white">
                <tr>
                  <th scope="col" className="w-24 px-4 py-3 font-semibold sm:px-5">
                    Visit
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    What we do
                  </th>
                </tr>
              </thead>
              <tbody>
                {startupVisits.map((row) => (
                  <tr key={row.visit} className="border-t border-slate-200">
                    <th scope="row" className="px-4 py-4 font-semibold text-slate-900 sm:px-5">
                      {row.visit}
                    </th>
                    <td className="px-4 py-4 leading-relaxed text-slate-600 sm:px-5">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </Container>
      </Section>

      <Section id="please-dont" className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Please Don&apos;t</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">What to avoid during plaster startup, and until when</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    Don&apos;t
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    Until
                  </th>
                </tr>
              </thead>
              <tbody>
                {startupDonts.map((row) => (
                  <tr key={row.action} className="border-t border-slate-200">
                    <th scope="row" className="px-4 py-4 font-medium text-slate-900 sm:px-5">
                      {row.action}
                    </th>
                    <td className="px-4 py-4 leading-relaxed text-slate-600 sm:px-5">
                      {"emphasis" in row && row.emphasis ? (
                        <strong className="font-semibold text-slate-900">{row.until}</strong>
                      ) : (
                        row.until
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-sm leading-relaxed text-slate-700">
            <strong className="font-semibold text-slate-900">You can</strong> skim leaves gently
            with a soft net. Leaves sitting on new plaster can stain it.
          </p>
          </div>
        </Container>
      </Section>

      <Section id="whats-normal" muted className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">What&apos;s Normal</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {startupNormal.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                {"warning" in item ? (
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-800">
                    {item.warning}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          </div>
        </Container>
      </Section>

      <Section id="call-us" className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Call Us If You Notice</h2>
          <ul className="mt-6 space-y-3">
            {startupCallIf.map((item) => (
              <li key={item} className="flex gap-3 text-base text-slate-700">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-700" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            When in doubt, call. It&apos;s much easier to fix things early.
          </p>
          <div className="mt-6">
            <PhoneLink variant="primary" size="lg" showIcon />
          </div>
          </div>
        </Container>
      </Section>

      <Section id="after-walkthrough" muted className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              After the Final Walkthrough
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We&apos;ll walk you through the water readings and what to keep doing through Day 30.{" "}
              <strong className="font-semibold text-slate-900">
                If you have a pool service, please send them this page before they take over.
              </strong>
            </p>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-700">
              <li>
                <strong className="font-semibold text-slate-900">
                  No robot, automatic cleaner, heater, salt, or salt cell until Day 30.
                </strong>
              </li>
              <li>
                <strong className="font-semibold text-slate-900">
                  Keep the water balanced, and don&apos;t let it turn aggressive.
                </strong>{" "}
                Low calcium and low pH can etch new plaster.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-900 px-6 py-6 text-brand-50 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
              For pool service professionals
            </p>
            <p className="mt-3 text-base leading-relaxed">
              Maintain LSI between <strong className="font-semibold text-white">0.0 and +0.3</strong>{" "}
              and keep CYA <strong className="font-semibold text-white">below 50 ppm</strong>,
              especially during the first six months.
            </p>
          </div>

          <div
            id="warranty"
            className="scroll-mt-48 rounded-2xl border border-accent-500/40 bg-white px-6 py-6 shadow-sm sm:px-8"
          >
            <h2 className="text-2xl font-bold text-slate-900">Your Warranty</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Your plaster warranty depends on following this startup process. Staining, scaling,
              streaking, or etching caused by skipped brushing, an interrupted fill, or unbalanced
              water isn&apos;t covered.
            </p>
            <p className="mt-4">
              <Link
                href="/warranty"
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                Renovation warranty details
              </Link>
            </p>
          </div>
          </div>
        </Container>
      </Section>

      <Section id="renovations" className="scroll-mt-48">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Planning a replaster
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Pool renovations across Central Texas
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We leak-check every pool before plaster, then resurface it. This guide is what
              happens after the new surface goes in.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href={renovationPath} size="lg">
                Pool renovations
              </Button>
            </div>
          </div>
          <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((area) => (
              <li key={area.slug}>
                <Link
                  href={getCityServicePath(renovationSlug, area.slug)}
                  className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  Pool renovation — {area.name}, TX
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Questions?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Call or text <strong className="font-semibold text-slate-900">{site.phone}</strong> or
            email{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-700 hover:text-brand-800"
            >
              {site.email}
            </a>
            .
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PhoneLink variant="primary" size="lg" showIcon />
            <TextLink variant="secondary" size="lg" showIcon label={`Text ${site.phone}`} />
          </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
