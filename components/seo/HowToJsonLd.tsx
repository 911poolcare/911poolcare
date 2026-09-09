import { getLeakDetectionHowToSchema } from "@/lib/schema";

export function HowToJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getLeakDetectionHowToSchema()),
      }}
    />
  );
}
