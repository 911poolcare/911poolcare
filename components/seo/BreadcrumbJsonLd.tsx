import { getBreadcrumbSchema } from "@/lib/schema";

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function BreadcrumbJsonLd({ items }: { items: readonly BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getBreadcrumbSchema(items)),
      }}
    />
  );
}
