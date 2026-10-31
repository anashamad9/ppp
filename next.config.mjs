import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd()),
  outputFileTracingIncludes: {
    "/**/articles/*/*": ["./lib/fonts/*.ttf"],
  },
  serverExternalPackages: ["@resvg/resvg-js"],
}

export default nextConfig
