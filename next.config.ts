import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  assetPrefix: "/portfolio",
  images: { unoptimized: true }
};

export default nextConfig;
