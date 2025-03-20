/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};

module.exports = nextConfig; 