/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during production builds
    ignoreBuildErrors: true,
  },
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  // Increase build memory limit
  experimental: {
    // Increase memory limit for builds
    memoryBasedWorkersCount: true,
    // Optimize bundle size
    optimizeCss: true,
  },
  // External packages that should be handled by the server
  serverExternalPackages: ['bcrypt', 'bcryptjs'],
  // Handle potential webpack issues
  webpack: (config, { isServer }) => {
    // Fix issues with certain packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
      };
    }
    return config;
  },
};

module.exports = nextConfig; 