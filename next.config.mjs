/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Move the setting from experimental to top-level
  serverExternalPackages: ["@lancedb/lancedb"],

 
};

export default nextConfig;