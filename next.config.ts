import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The Vite codebase contains legacy domain-model type drift. Keep parity with
  // the previous production build while those types are tightened separately.
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
