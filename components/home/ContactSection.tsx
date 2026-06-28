import { getServiceAreasDisplay, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { GoogleMapEmbed } from "@/components/contact/GoogleMapEmbed";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <Section id="contact" muted>
      <Container>
        <SectionHeading
          eyebrow="Get Started"
          title="Let's discuss your pool repair needs"
          description="Fill out the form or call us to schedule service. Free consultations are available for renovation projects. We respond fast — often same day."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Contact us directly</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-3 font-semibold text-brand-700 hover:text-brand-800"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 text-slate-700 hover:text-brand-700"
                  >
                    <Mail className="h-5 w-5" aria-hidden />
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                  <span>
                    <a
                      href={site.google.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-700 hover:text-brand-800"
                    >
                      {site.address.full}
                    </a>
                    <br />
                    <span className="text-slate-500">
                      {getServiceAreasDisplay()}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        <div className="mt-10">
          <GoogleMapEmbed />
        </div>
      </Container>
    </Section>
  );
}
