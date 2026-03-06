/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Move the setting from experimental to top-level
  serverExternalPackages: ["@lancedb/lancedb"],

  // 2. Silence the Turbopack/Webpack warning by adding an empty turbopack config
  // (Turbopack handles most things automatically now)
  experimental: {
    turbopack: {},
  },
};

export default nextConfig;