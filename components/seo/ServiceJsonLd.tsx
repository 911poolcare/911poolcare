import { getServiceSchema } from "@/lib/schema";

type ServiceJsonLdProps = {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string;
};

export function ServiceJsonLd(props: ServiceJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema(props)) }}
    />
  );
}
