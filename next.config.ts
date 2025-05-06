import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pickholder.sirv.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
