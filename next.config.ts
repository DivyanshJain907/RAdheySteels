import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-domain.com', 'cdn.pixabay.com', 'tse2.mm.bing.net', 'images.unsplash.com', 'via.placeholder.com'],
  },
};

export default nextConfig;
