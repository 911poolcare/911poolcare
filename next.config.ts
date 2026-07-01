import type { NextConfig } from "next";
import { legacyRedirects } from "./content/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seal-austin.bbb.org",
        pathname: "/seals/**",
      },
    ],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
