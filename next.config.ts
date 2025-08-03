import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
   ignorePatterns: ['src/app/api/tasks/route.ts'],
  images: {
    domains: [
      'cdn.pixabay.com',
      'images.unsplash.com',
      "cdni.iconscout.com",
      "img.freepik.com"
    ],
  },
};

export default nextConfig;
