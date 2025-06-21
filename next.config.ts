import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
