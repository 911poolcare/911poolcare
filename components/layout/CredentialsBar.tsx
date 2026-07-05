import Image from "next/image";
import Link from "next/link";
import { footerCredentials } from "@/content/credentials";
import { Container } from "@/components/ui/Container";

export function CredentialsBar() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <Container className="py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Accredited & certified
        </p>
        <ul className="mx-auto mt-5 grid w-full max-w-md grid-cols-3 items-center justify-items-center gap-x-6 sm:max-w-2xl sm:gap-x-16">
          {footerCredentials.map((credential) => {
            const image = (
              <Image
                src={credential.image.src}
                alt={credential.image.alt}
                width={credential.image.width}
                height={credential.image.height}
                className="max-h-20 w-auto max-w-full object-contain sm:max-h-24"
              />
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
