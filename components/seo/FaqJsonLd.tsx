import { getFaqSchema } from "@/lib/schema";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqJsonLdProps = {
  items?: readonly FaqItem[];
};

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(items)) }}
    />
  );
}
