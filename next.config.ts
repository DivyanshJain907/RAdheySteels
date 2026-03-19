import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-domain.com', 'cdn.pixabay.com'],
  },
};

export default nextConfig;
