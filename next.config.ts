import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/procurement",
        destination: "/services",
        permanent: true,
      },
      { source: "/services/bulk", destination: "/services", permanent: true },
      {
        source: "/services/hard-to-find",
        destination: "/services",
        permanent: true,
      },
      { source: "/support", destination: "/services", permanent: true },
      { source: "/support/warranty", destination: "/contact", permanent: true },
      {
        source: "/support/integration",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/consulting/ai-infra",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/consulting/datacenter",
        destination: "/services",
        permanent: true,
      },
      { source: "/consulting/hpc", destination: "/services", permanent: true },
      { source: "/log", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://images.unsplash.com https://i.pravatar.cc https://res.cloudinary.com data: blob:; font-src 'self' data:; connect-src 'self' ws: https://res.cloudinary.com; frame-src 'none'; object-src 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
