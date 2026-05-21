import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@coach/ui", "@coach/types"],
};

export default nextConfig;
