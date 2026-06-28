import { faqs } from "@/content/trust";
import { services } from "@/content/services";
import { site } from "@/content/site";

const businessId = `${site.urls.site}/#business`;

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.name,
    description: site.description,
    url: site.urls.site,
    telephone: site.phone,
    email: site.email,
    image: `${site.urls.site}${site.logo.src}`,
    logo: `${site.urls.site}${site.logo.src}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.google.coordinates.lat,
      longitude: site.google.coordinates.lng,
    },
    areaServed: site.serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city}, TX`,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.google.rating,
      reviewCount: site.google.reviewCount,
      bestRating: 5,
    },
    sameAs: [site.google.mapsUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pool repair and renovation services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${site.urls.site}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.urls.site}/#website`,
    url: site.urls.site,
    name: site.name,
    description: site.description,
    publisher: { "@id": businessId },
  };
}
