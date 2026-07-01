import Image from "next/image";
import Link from "next/link";
import { footerCredentials } from "@/content/credentials";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function CredentialsBar() {
  return (
    <div className="border-t border-white/10 bg-brand-950/50">
      <Container className="py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
          Accredited & certified
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {footerCredentials.map((credential) => {
            const image = (
              <Image
                src={credential.image.src}
                alt={credential.image.alt}
                width={credential.image.width}
                height={credential.image.height}
                className={cn(
                  credential.id === "bbb"
                    ? "h-16 w-auto max-w-[11rem] object-contain sm:h-[4.5rem]"
                    : "h-16 w-auto object-contain sm:h-20",
                )}
              />
            );

            return (
              <li key={credential.id}>
                {credential.href ? (
                  <Link
                    href={credential.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg transition-opacity hover:opacity-90"
                    title={credential.title}
                  >
                    {image}
                  </Link>
                ) : (
                  <span className="block" title={credential.title}>
                    {image}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
