const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    domains: ["vercel.com", "assets.vercel.com", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add this to ensure static files are properly handled
  trailingSlash: false,
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    "/**/articles/*/*": ["./lib/fonts/*.ttf"],
  },
  serverExternalPackages: ["@resvg/resvg-js"],
}

module.exports = nextConfig
