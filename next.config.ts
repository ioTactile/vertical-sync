import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "vertical-sync.s3.eu-west-3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
