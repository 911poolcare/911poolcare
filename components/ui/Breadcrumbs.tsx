import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { site } from "@/content/site";

type Crumb = {
  label: string;
  /** Include on every crumb (including the current page) for BreadcrumbList JSON-LD. */
  href?: string;
};

function toAbsoluteUrl(href: string) {
  if (href.startsWith("http")) return href;
  return `${site.urls.site}${href.startsWith("/") ? href : `/${href}`}`;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schemaItems = items
    .filter((item): item is Crumb & { href: string } => Boolean(item.href))
    .map((item) => ({
      name: item.label,
      url: toAbsoluteUrl(item.href),
    }));

  const includeSchema = schemaItems.length === items.length && items.length > 0;

  return (
    <>
      {includeSchema ? <BreadcrumbJsonLd items={schemaItems} /> : null}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-200">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.label} className="flex items-center gap-1">
                {index > 0 ? (
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
                ) : null}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-white" : undefined}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
