/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ignoreBuildErrors: true,
  },
  // Add this to ensure static files are properly handled
  trailingSlash: false,
  output: "standalone",
}

module.exports = nextConfig
