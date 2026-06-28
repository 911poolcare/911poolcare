import { getFaqSchema } from "@/lib/schema";

export function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema()) }}
    />
  );
}
