/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.scrollbooker.ro",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudflarestream.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
