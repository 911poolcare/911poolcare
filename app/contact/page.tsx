import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: poolCareOffering.contact.title,
  description: poolCareOffering.contact.metaDescription,
  alternates: {
    canonical: `${site.urls.site}/contact`,
  },
  openGraph: {
    title: `${poolCareOffering.contact.title} | ${site.name}`,
    description: poolCareOffering.contact.metaDescription,
    url: `${site.urls.site}/contact`,
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
