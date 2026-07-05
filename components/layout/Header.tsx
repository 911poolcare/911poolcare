import { PhoneLink } from "@/components/layout/PhoneLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/partners", label: "Partners" },
  { href: "/#leak-process", label: "Leak Process" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <Container>
        <div className="flex h-[10.75rem] items-center justify-between gap-4 sm:h-[9.5rem]">
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
            <PhoneLink variant="secondary" size="sm" showIcon />
            <Button href="/#contact" size="sm">
              Request Service
            </Button>
          </div>

          <MobileMenu navLinks={navLinks} />
        </div>
      </Container>
    </header>
  );
}
