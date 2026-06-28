import { getLocalBusinessSchema, getWebsiteSchema } from "@/lib/schema";

export function JsonLd() {
  const schemas = [getLocalBusinessSchema(), getWebsiteSchema()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
