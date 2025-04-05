/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Enable compression
  compress: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Enable React strict mode
  reactStrictMode: true,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Configure eslint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Add webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize images
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: !dev,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        }
      ]
    });
    
    return config;
  }
}

module.exports = nextConfig 