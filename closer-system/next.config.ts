import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ai-sales-mastery',
  assetPrefix: '/ai-sales-mastery',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
