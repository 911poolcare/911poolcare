import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-950 pb-24 text-slate-300 md:pb-10">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo size="lg" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {site.description}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Service Areas
          </p>
          <Link
            href="/areas"
            className="text-sm leading-relaxed text-slate-400 hover:text-white"
          >
            {site.serviceAreas.join(" · ")}
          </Link>
          <p className="mt-4">
            <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white">
              About us →
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="/partners"
              className="text-sm font-medium text-slate-400 hover:text-white"
            >
              Pool company partners →
            </Link>
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 font-semibold text-white hover:text-accent-400"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {site.email}
          </a>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {site.address.full}
          </p>
        </div>
      </Container>

      <Container className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </Container>
    </footer>
  );
}
