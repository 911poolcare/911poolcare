import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
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
        <JsonLd />
        <GoogleAnalytics />
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
