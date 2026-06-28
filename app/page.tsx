import type { Metadata } from "next";
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
import { Testimonials } from "@/components/home/Testimonials";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { FAQ } from "@/components/home/FAQ";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

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
      <FaqJsonLd />
      <Hero />
      <LeakDetectionProcess />
      <RenovationSpotlight />
      <PriorityMarkets />
      <ServicesPreview />
      <PartnerSection />
      <OurPromise />
      <Testimonials />
      <FeaturesGrid />
      <FAQ />
      <ContactSection />
    </>
  );
}