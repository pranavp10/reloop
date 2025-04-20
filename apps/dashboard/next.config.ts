import type { NextConfig } from "next";

import env from "@/lib/env/client";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
      {
        source: "/dashboard",
        destination: env.NEXT_PUBLIC_WEB_URL,
      },
    ];
  },
};

export default nextConfig;
