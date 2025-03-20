/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  // Enable static exports for better performance
  output: 'export',
  // Enable compression
  compress: true,
  // Enable production source maps
  productionBrowserSourceMaps: true,
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '/Portfolio',
}

module.exports = nextConfig 