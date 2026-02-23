import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-expect-error - ESLint property naming conflict in NextConfig type
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
