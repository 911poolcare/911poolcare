import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { CredentialsBar } from "@/components/layout/CredentialsBar";
import { cities } from "@/content/cities";
import { getCityHubPath } from "@/lib/local-seo";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-950 pb-24 text-slate-300 md:pb-10">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo size="lg" variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {site.description}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Service Areas
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={getCityHubPath(city.slug)}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href="/areas" className="text-sm font-medium text-slate-400 hover:text-white">
              View all service areas →
            </Link>
          </p>
          <p className="mt-2">
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
          <PhoneLink variant="footer" className="text-sm" />
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {site.email}
          </a>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {site.address.display}
          </p>
        </div>
      </Container>

      <CredentialsBar />

      <Container className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </Container>
    </footer>
  );
}
