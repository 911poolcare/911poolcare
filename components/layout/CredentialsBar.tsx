import Image from "next/image";
import Link from "next/link";
import { footerCredentials } from "@/content/credentials";
import { Container } from "@/components/ui/Container";

export function CredentialsBar() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <Container className="py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Licensed, accredited & certified
        </p>
        <ul className="mx-auto mt-5 grid w-full max-w-3xl grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-4 sm:gap-8">
          {footerCredentials.map((credential) => {
            const content = credential.image ? (
              <Image
                src={credential.image.src}
                alt={credential.image.alt}
                width={credential.image.width}
                height={credential.image.height}
                className="max-h-20 w-auto max-w-full object-contain sm:max-h-24"
              />
            ) : (
              <span className="flex flex-col items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-3 py-3 text-center shadow-sm">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
                  TDLR Licensed
                </span>
                <span className="mt-1 text-sm font-bold text-brand-900 sm:text-base">
                  {credential.badgeText ?? credential.shortLabel}
                </span>
              </span>
            );

            return (
              <li
                key={credential.id}
                className="flex h-24 w-full items-center justify-center sm:h-28"
              >
                {credential.href ? (
                  <Link
                    href={credential.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg transition-opacity hover:opacity-90"
                    aria-label={credential.title}
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="block" title={credential.title}>
                    {content}
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
