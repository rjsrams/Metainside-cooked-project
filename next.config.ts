import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure allowed dev origins to prevent cross-origin warnings
  allowedDevOrigins: [
    "preview.metainside.io",
    "*.preview.metainside.io",
    ".preview.metainside.io"
  ],
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://*.preview.metainside.io",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
