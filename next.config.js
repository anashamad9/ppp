/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["vercel.com", "assets.vercel.com", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add base path if deploying to GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/ppp" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/ppp/" : "",
}

module.exports = nextConfig
