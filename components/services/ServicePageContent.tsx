import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CheckCircle2, Phone, MessageSquare } from "lucide-react";
import { getServiceCtaLabel, getServiceSchedulingNote } from "@/content/pricing";
import type { City } from "@/content/cities";
import { cityOffersService, getCitiesForService, isPriorityCity } from "@/content/cities";
import { getCityHub } from "@/content/city-hubs";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import { site } from "@/content/site";
import {
  getCityServiceHeadline,
  getCityServiceIntro,
  getCityServicePath,
  getCityHubPath,
} from "@/lib/local-seo";
import { inspectionSeo } from "@/content/inspections";
import {
  getCityServiceGalleryImages,
  getCityServiceHeroImage,
  getCityServiceProgressSets,
  getCityServiceVideos,
  getServiceGalleryImages,
  getServiceHeroImage,
  getServiceProgressSets,
  getServiceVideos,
} from "@/content/media";
import { getServiceGallery } from "@/content/galleries";
import { getTeamForService } from "@/content/team";
import { ServicePricing } from "@/components/services/ServicePricing";
import { ServiceHeroLcpPreload } from "@/components/services/ServiceHeroLcpPreload";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { TeamSection } from "@/components/team/TeamSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getCityLeakDetectionFaqs,
  getCityLeakDetectionMeta,
  leakDetectionFaqs,
} from "@/content/leak-detection";

const PhotoGallery = dynamic(() =>
  import("@/components/gallery/PhotoGallery").then((module) => ({
    default: module.PhotoGallery,
  })),
);

const JobProgressGallery = dynamic(() =>
  import("@/components/gallery/JobProgressGallery").then((module) => ({
    default: module.JobProgressGallery,
  })),
);

const VideoGallery = dynamic(() =>
  import("@/components/gallery/VideoGallery").then((module) => ({
    default: module.VideoGallery,
  })),
);

const RenovationPageExtras = dynamic(() =>
  import("@/components/services/RenovationPageExtras").then((module) => ({
    default: module.RenovationPageExtras,
  })),
);

const InspectionPageExtras = dynamic(() =>
  import("@/components/services/InspectionPageExtras").then((module) => ({
    default: module.InspectionPageExtras,
  })),
);

const LeakDetectionPageExtras = dynamic(() =>
  import("@/components/services/LeakDetectionPageExtras").then((module) => ({
    default: module.LeakDetectionPageExtras,
  })),
);

type ServicePageContentProps = {
  service: Service;
  city?: City;
};

export function ServicePageContent({ service, city }: ServicePageContentProps) {
  const otherServices = services
    .filter((s) => s.slug !== service.slug)
    .filter((s) => !city || cityOffersService(city, s.slug));
  const otherCities = getCitiesForService(service.slug).filter(
    (c) => !city || c.slug !== city.slug,
  );

  const headline = city ? getCityServiceHeadline(service, city) : service.headline;
  const intro = city ? getCityServiceIntro(service, city) : service.intro;
  const cityHub = city ? getCityHub(city.slug) : undefined;
  const ctaLabel = getServiceCtaLabel(service.slug);
  const heroSrc = city
    ? getCityServiceHeroImage(service.slug, city.slug) ?? getServiceHeroImage(service.slug) ?? service.image
    : getServiceHeroImage(service.slug) ?? service.image;
  const gallery = city
    ? getCityServiceGalleryImages(service.slug, city.slug)
    : getServiceGalleryImages(service.slug, 6).length > 0
      ? getServiceGalleryImages(service.slug, 6)
      : getServiceGallery(service.slug).slice(0, 6);
  const progressSets = city
    ? getCityServiceProgressSets(service.slug, city.slug, city)
    : getServiceProgressSets(service.slug, 2);
  const videos = city
    ? getCityServiceVideos(service.slug, city.slug)
    : getServiceVideos(service.slug, 4);
  const isInspections = service.slug === "pool-inspections";
  const isRenovations = service.slug === "pool-renovations";
  const showProgress = !isRenovations && !isInspections;
  const showGallery =
    gallery.length > 0 &&
    !(service.slug === "pool-equipment-repair" && progressSets.length > 0) &&
    !isInspections;
  const galleryTitle =
    service.slug === "pool-leak-detection"
      ? city
        ? `On the job — ${city.name}`
        : "Leak detection & repair in the field"
      : service.slug === "pool-equipment-repair"
        ? city
          ? `Equipment work — ${city.name}`
          : "Pool equipment in the field"
        : city
          ? `${service.title} in ${city.name} — project photos`
          : `${service.title} — project photos`;
  const videoTitle = city
    ? `${service.title} in ${city.name} — project videos`
    : `${service.title} — project videos`;
  const servicePath = `/services/${service.slug}`;
  const pagePath = city ? `${servicePath}/${city.slug}` : servicePath;
  const contactHref = "/contact";
  const leakFaqs =
    service.slug === "pool-leak-detection"
      ? city
        ? getCityLeakDetectionFaqs(city.slug, city.name)
        : leakDetectionFaqs
      : null;

  return (
    <>
      <ServiceHeroLcpPreload src={heroSrc} />
      {leakFaqs ? <FaqJsonLd items={leakFaqs} /> : null}
      {service.slug === "pool-leak-detection" ? (
        <ServiceJsonLd
          name={city ? `Pool leak repair in ${city.name}, TX` : "Pool leak repair in Austin & Central Texas"}
          serviceType="Pool leak repair"
          description={
            city ? getCityLeakDetectionMeta(city.slug, city.name) : service.metaDescription
          }
          url={`${site.urls.site}${pagePath}`}
          areaServed={city?.name}
        />
      ) : null}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Breadcrumbs
              items={
                city
                  ? [
                      { label: "Home", href: "/" },
                      { label: "Services", href: "/services" },
                      { label: service.title, href: servicePath },
                      { label: city.name, href: pagePath },
                    ]
                  : [
                      { label: "Home", href: "/" },
                      { label: "Services", href: "/services" },
                      { label: service.title, href: pagePath },
                    ]
              }
            />
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">{intro}</p>
            {service.slug === "pool-inspections" ? (
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                {inspectionSeo.subIntro}
              </p>
            ) : null}
            {isRenovations ? (
              <p className="mt-4 text-sm font-medium text-brand-50">
                {site.google.rating}★ on Google ({site.google.reviewCount} reviews)
                {" · "}
                Free on-site consultation
                {" · "}
                Serving Central Texas
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isRenovations ? (
                <>
                  <Button href={contactHref} variant="secondary" size="lg">
                    <MessageSquare className="h-5 w-5" aria-hidden />
                    {ctaLabel}
                  </Button>
                  <Button href={site.phoneHref} variant="outline" size="lg">
                    <Phone className="h-5 w-5" aria-hidden />
                    Call {site.phone}
                  </Button>
                </>
              ) : (
                <>
                  <Button href={site.phoneHref} variant="secondary" size="lg">
                    <Phone className="h-5 w-5" aria-hidden />
                    Call {site.phone}
                  </Button>
                  <Button href={contactHref} variant="outline" size="lg">
                    <MessageSquare className="h-5 w-5" aria-hidden />
                    {ctaLabel}
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <Image
              src={heroSrc}
              alt={service.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {city ? `What we offer in ${city.name}` : "What we offer"}
            </h2>
            <ul className="mt-6 space-y-4">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ServicePricing serviceSlug={service.slug} />
            {city ? (
              <p className="mt-8 text-slate-600 leading-relaxed">
                {getServiceSchedulingNote(service.slug, city.name)}
              </p>
            ) : (
              <p className="mt-8 text-slate-600 leading-relaxed">
                {getServiceSchedulingNote(service.slug)}
              </p>
            )}
            {city && service.slug === "pool-leak-detection" ? (
              <p className="mt-4 text-slate-600 leading-relaxed">
                Also need pump, heater, or filter repair in {city.name}?{" "}
                <Link
                  href={getCityServicePath("pool-equipment-repair", city.slug)}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Pool equipment repair in {city.name} →
                </Link>
              </p>
            ) : null}
            {city && service.slug === "pool-equipment-repair" ? (
              <p className="mt-4 text-slate-600 leading-relaxed">
                Losing water and think it might be a leak?{" "}
                <Link
                  href={getCityServicePath("pool-leak-detection", city.slug)}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Pool leak repair in {city.name} →
                </Link>
              </p>
            ) : null}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            {city && isPriorityCity(city.slug) && cityHub ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  Growing market
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {city.name} neighborhoods
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cityHub.neighborhoods.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <Link
                  href={getCityHubPath(city.slug)}
                  className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  All {city.name} services →
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-slate-900">
                  {city ? `Also serving near ${city.name}` : "Service areas"}
                </h3>
                {city ? (
                  <Link
                    href={getCityHubPath(city.slug)}
                    className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Pool services in {city.name} →
                  </Link>
                ) : null}
              </>
            )}
            <ul className={`space-y-2 ${city && isPriorityCity(city.slug) ? "mt-6 border-t border-slate-200 pt-4" : "mt-3"}`}>
              {otherCities.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={getCityServicePath(service.slug, area.slug)}
                    className="text-sm text-brand-700 hover:text-brand-800"
                  >
                    {service.title} — {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={contactHref} className="mt-6 w-full">
              {ctaLabel}
            </Button>
          </aside>
        </Container>
      </Section>

      {showProgress && progressSets.length > 0 ? (
        <JobProgressGallery
          sets={progressSets}
          title={
            service.slug === "pool-leak-detection"
              ? city
                ? `Leak repair — ${city.name}`
                : "Leak repair on the job"
              : service.slug === "pool-equipment-repair"
                ? city
                  ? `Equipment replacements — ${city.name}`
                  : "Equipment replacements on the job"
                : city
                  ? `Before, during & after — ${city.name} jobs`
                  : "Before, during & after"
          }
          description={
            service.slug === "pool-leak-detection"
              ? city
                ? `Underground plumbing leak located and repaired on a ${city.name}-area job.`
                : "Failed underground PVC located, repaired, and ready to backfill — same job, start to finish."
              : service.slug === "pool-equipment-repair"
                ? city
                  ? `Pumps, heaters, filters, and chlorinators replaced on ${city.name}-area equipment pads.`
                  : "Same equipment pad before and after — pumps, heaters, filters, chlorinators, and booster pumps upgraded or replaced."
                : city
                  ? `Photos from recent ${service.title.toLowerCase()} jobs in and around ${city.name}.`
                  : "Photos from the same pool job — how we diagnose, repair, and finish the work."
          }
        />
      ) : null}

      {showGallery ? (
        <PhotoGallery
          images={gallery}
          title={galleryTitle}
          description={
            service.slug === "pool-leak-detection"
              ? city
                ? `Detection, excavation, and repair work from ${city.name}-area jobs.`
                : "Dye testing, electronic detection, deck excavation, and underground plumbing repairs across Central Texas."
              : city
                ? `Recent ${service.title.toLowerCase()} work serving ${city.name} and nearby areas.`
                : "Photos from recent jobs pulled from our project portfolio."
          }
          muted={progressSets.length > 0}
        />
      ) : null}

      {videos.length > 0 && !isInspections ? (
        <VideoGallery
          videos={videos}
          title={videoTitle}
          description={
            city
              ? `Short clips from ${city.name}-area jobs.`
              : "Short clips from recent detection, repair, equipment, and renovation jobs."
          }
          muted={gallery.length === 0}
        />
      ) : null}

      {service.slug === "pool-renovations" ? (
        <RenovationPageExtras city={city} />
      ) : null}

      {service.slug === "pool-inspections" ? (
        <InspectionPageExtras city={city} />
      ) : null}

      {service.slug === "pool-leak-detection" ? (
        <LeakDetectionPageExtras city={city} />
      ) : null}

      {service.slug === "pool-equipment-repair" ? (
        <TeamSection
          members={getTeamForService("pool-equipment-repair")}
          muted
          eyebrow="Your equipment specialist"
          title="RAIL-certified repair led by Danielle"
          description={`Danielle — our head technician and Installer of Record (RAIL ${site.railCertified.displayNumber}) — focuses on pool electrical work, equipment repair, leak detection, and quality control. ${site.raicLicensed.inline}.`}
        />
      ) : null}

      <Section muted>
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Other services</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={
                  city
                    ? getCityServicePath(item.slug, city.slug)
                    : `/services/${item.slug}`
                }
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                  {city ? `${item.title} — ${city.name}` : item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
