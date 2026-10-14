import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // The hall-ticket PDF routes read these TTFs from disk at runtime, so they
  // must be shipped with the serverless functions.
  outputFileTracingIncludes: {
    "/api/scholarship/ticket/[id]": ["./src/assets/fonts/**"],
    "/api/scholarship/rules": ["./src/assets/fonts/**"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
