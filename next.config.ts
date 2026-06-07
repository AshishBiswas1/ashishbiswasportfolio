import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
