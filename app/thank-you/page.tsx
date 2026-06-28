import type { Metadata } from "next";
import { CheckCircle2, Phone } from "lucide-react";
import { ThankYouGate } from "@/components/contact/ThankYouGate";
import { TrackLeadConversion } from "@/components/analytics/TrackLeadConversion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Request Received",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ThankYouPage() {
  return (
    <ThankYouGate>
      <TrackLeadConversion />
      <section className="bg-slate-50 py-12 sm:py-16">
        <Container className="max-w-xl pb-24 md:pb-12">
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <CheckCircle2
              className="mx-auto h-14 w-14 text-green-600"
              aria-hidden
            />
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Request received!
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Thank you for reaching out. We&apos;ll get back to you within one
              business day.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              For urgent pool issues, call us directly — we respond fast.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href={site.phoneHref} size="lg">
                <Phone className="h-5 w-5" aria-hidden />
                Call {site.phone}
              </Button>
              <Button href="/" variant="outline" size="lg">
                Back to home
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </ThankYouGate>
  );
}
