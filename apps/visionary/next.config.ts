import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/shield/:path*',
        destination: `${process.env.NEXT_PUBLIC_SHIELD_API_URL}/:path*`,
      },
    ];
  },
  transpilePackages: ['@reloop/ui'],
};

export default nextConfig;
