import { faqs } from "@/content/trust";
import { getFeaturedGoogleReviews } from "@/content/testimonials";
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
    priceRange: site.priceRange,
    openingHours: site.openingHours,
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
    review: getFeaturedGoogleReviews().map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.quote,
      ...(review.datePublished ? { datePublished: review.datePublished } : {}),
    })),
    sameAs: [
      site.google.mapsUrl,
      site.social.facebook,
      site.social.instagram,
    ],
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

type FaqItem = {
  question: string;
  answer: string;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function getFaqSchema(items: readonly FaqItem[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
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

export function getServiceSchema(options: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    serviceType: options.serviceType,
    description: options.description,
    url: options.url,
    provider: { "@id": businessId },
    areaServed: options.areaServed
      ? { "@type": "City", name: `${options.areaServed}, TX` }
      : site.serviceAreas.map((city) => ({
          "@type": "City",
          name: `${city}, TX`,
        })),
  };
}
