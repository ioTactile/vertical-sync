import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'vertical-sync.s3.eu-west-3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
