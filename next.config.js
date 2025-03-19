/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Enable compression
  compress: true,
  // Enable production source maps
  productionBrowserSourceMaps: true,
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 