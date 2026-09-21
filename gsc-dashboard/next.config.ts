import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is a standalone project nested inside the main frontend repo.
  // Pin Turbopack to this folder so the main app's lockfile isn't picked up.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
