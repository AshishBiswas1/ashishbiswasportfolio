import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  distDir: process.env.BUILD_DIR || ".next",
  images: {
   remotePatterns: [
    {
     protocol: "https",
     hostname: "res.cloudinary.com", // Replace with your actual image host if different
    },
    // If you are serving images directly from your local backend for now:
    {
     protocol: "http",
     hostname: "localhost",
     port: "3000",
    },
   ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve("node_modules/react"),
      "react-dom": path.resolve("node_modules/react-dom"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      react: "./node_modules/react",
      "react-dom": "./node_modules/react-dom",
    },
  },
};

export default nextConfig;
