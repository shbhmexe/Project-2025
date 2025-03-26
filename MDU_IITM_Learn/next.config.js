/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "mduiitmlearn.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  trailingSlash: true, // Ensures proper sitemap URLs
  swcMinify: true,
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disabling ESLint during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
