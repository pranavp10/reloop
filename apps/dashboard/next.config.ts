import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/:path*`,
      },
    ];
  },
  transpilePackages: ['@reloop/ui'],
};

export default nextConfig;
