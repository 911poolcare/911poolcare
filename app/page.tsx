import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroLcpPreload } from "@/components/home/HeroLcpPreload";
import { Hero } from "@/components/home/Hero";
import { poolCareOffering } from "@/content/service-offering";
import { defaultOpenGraphImage } from "@/content/og-images";
import { site } from "@/content/site";
import { PriorityMarkets } from "@/components/home/PriorityMarkets";
import { RenovationSpotlight } from "@/components/home/RenovationSpotlight";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PartnerSection } from "@/components/home/PartnerSection";
import { LeakDetectionProcess } from "@/components/home/LeakDetectionProcess";
import { OurPromise } from "@/components/home/OurPromise";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ServiceAreaChips } from "@/components/home/ServiceAreaChips";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

const Testimonials = dynamic(() =>
  import("@/components/home/Testimonials").then((module) => ({
    default: module.Testimonials,
  })),
);

const FAQ = dynamic(() =>
  import("@/components/home/FAQ").then((module) => ({
    default: module.FAQ,
  })),
);

const ContactSection = dynamic(() =>
  import("@/components/home/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);

export const metadata: Metadata = {
  title: "Pool Leak Detection & Repair Austin TX",
  description: poolCareOffering.metaDescription,
  keywords: [
    "pool leak detection Austin",
    "pool leak repair Austin TX",
    "pool repair Austin",
    "pool renovation Austin",
    "pool equipment repair Austin",
  ],
  alternates: {
    canonical: site.urls.site,
  },
  openGraph: {
    title: `Pool Leak Detection & Repair Austin TX | ${site.name}`,
    description: poolCareOffering.metaDescription,
    url: site.urls.site,
    images: [defaultOpenGraphImage],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroLcpPreload />
      <FaqJsonLd />
      <Hero />
      <LeakDetectionProcess />
      <RenovationSpotlight />
      <PriorityMarkets />
      <ServicesPreview />
      <ServiceAreaChips />
      <PartnerSection />
      <OurPromise />
      <Testimonials />
      <FeaturesGrid />
      <FAQ />
      <ContactSection />
    </>
  );
}
