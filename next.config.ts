import type { NextConfig } from "next";
import { legacyRedirects } from "./content/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
