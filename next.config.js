/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "vercel.com",
      "assets.vercel.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
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
  trailingSlash: true, // ✅ Important for GitHub Pages to serve /folder/index.html properly
  output: "export",     // ✅ Static export for GitHub Pages
  i18n: {               // ✅ Required for locale detection
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig