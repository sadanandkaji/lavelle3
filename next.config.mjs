/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move LanceDB to stable serverExternalPackages
  serverExternalPackages: ["@lancedb/lancedb"],
  
  // Remove the experimental turbopack key entirely.
  // Next 16 handles it automatically.
};

export default nextConfig;