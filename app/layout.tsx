import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { TelClickHandler } from "@/components/layout/TelClickHandler";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAdsCallTracking } from "@/components/analytics/GoogleAdsCallTracking";
import { GoogleAdsPhoneResync } from "@/components/analytics/GoogleAdsPhoneResync";
import { GoogleAnalytics, GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOpenGraphImage, twitterCard } from "@/content/og-images";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `Pool Leak Detection & Repair Austin TX | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.urls.site),
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.urls.site,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: twitterCard.card,
    title: twitterCard.title,
    description: twitterCard.description,
    images: twitterCard.images,
  },
  verification: {
    other: {
      "msvalidate.01": "EE6AED7EED2E64790F93A9861D4F6A68",
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <GoogleTagManagerNoScript />
        <JsonLd />
        <GoogleTagManager />
        <GoogleAdsCallTracking />
        <GoogleAnalytics />
        <GoogleAdsPhoneResync />
        <TelClickHandler />
        <Analytics />
      </body>
    </html>
  );
}
