import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudflare R2 public.dev URL
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      // Cloudflare Images delivery
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      // Common S3-compatible / CDN custom domains
      {
        protocol: "https",
        hostname: "*.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
