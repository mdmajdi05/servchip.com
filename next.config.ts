import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
      // Manufacturers → Brands migration (301 permanent, SEO preserved)
      {
        source: "/manufacturers/:slug/:categorySlug",
        destination: "/brands/:slug/:categorySlug",
        permanent: true,
      },
      {
        source: "/manufacturers/:slug",
        destination: "/brands/:slug",
        permanent: true,
      },
      {
        source: "/manufacturers",
        destination: "/products",
        permanent: true,
      },
      // Country subdirectory migration: /countries/{slug} → /{code} (301, SEO preserved)
      {
        source: "/countries/usa",
        destination: "/us",
        permanent: true,
      },
      {
        source: "/countries/india",
        destination: "/in",
        permanent: true,
      },
      {
        source: "/countries/uae",
        destination: "/ae",
        permanent: true,
      },
      {
        source: "/countries/united-kingdom",
        destination: "/uk",
        permanent: true,
      },
      {
        source: "/countries/germany",
        destination: "/de",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://images.unsplash.com https://i.pravatar.cc https://res.cloudinary.com data: blob:; font-src 'self' data:; connect-src 'self' ws: https://res.cloudinary.com; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
