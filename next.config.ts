import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // Or "http" if your images are served over HTTP
        hostname: "files.edgestore.dev",
        pathname: "**", // Optional: specify a path pattern if needed (e.g., "/account/**")
      },
    ],
  },
};

export default nextConfig;