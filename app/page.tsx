import { Hero } from "@/components/home/Hero";
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

export default function HomePage() {
  return (
    <>
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