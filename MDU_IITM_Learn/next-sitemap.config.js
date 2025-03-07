/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mduitmlearn.vercel.app",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/dashboard/*"],

  robotsTxtOptions: {
    additionalSitemaps: [
      "https://mduitmlearn.vercel.app/sitemap.xml"
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },

  additionalPaths: async (config) => [
    { loc: "/notes", lastmod: new Date().toISOString() },
    { loc: "/syllabus", lastmod: new Date().toISOString() },
    { loc: "/cgpa", lastmod: new Date().toISOString() },
    { loc: "/pyqs", lastmod: new Date().toISOString() },
  ],
};
