import type { NextConfig } from "next";
import { legacyRedirects } from "./content/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seal-austin.bbb.org",
        pathname: "/seals/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "911poolcare.com" }],
        destination: "https://www.911poolcare.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "911poolcare.com" }],
        destination: "https://www.911poolcare.com/:path*",
        permanent: true,
      },
      ...legacyRedirects,
    ];
  },
};

export default nextConfig;
