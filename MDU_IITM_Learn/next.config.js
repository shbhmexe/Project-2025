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
};

module.exports = nextConfig;
