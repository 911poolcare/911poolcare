"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services/pool-renovations", label: "Renovations" },
  { href: "/services", label: "Services" },
  { href: "/partners", label: "Partners" },
  { href: "/#leak-process", label: "Leak Process" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-16">
          <Logo priority />

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href={site.phoneHref} variant="secondary" size="sm">
              <Phone className="h-4 w-4" aria-hidden />
              {site.phone}
            </Button>
            <Button href="/#contact" size="sm">
              Request Service
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-slate-200 bg-white md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 grid gap-2">
            <Button href={site.phoneHref} variant="secondary" size="lg" className="w-full">
              <Phone className="h-5 w-5" aria-hidden />
              Call {site.phone}
            </Button>
            <Button href="/#contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Request Service
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
