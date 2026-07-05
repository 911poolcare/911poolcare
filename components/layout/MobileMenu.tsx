"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

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
            <PhoneLink
              variant="secondary"
              size="lg"
              className="w-full"
              showIcon
              label="Call"
            />
            <Button href="/#contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Request Service
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
