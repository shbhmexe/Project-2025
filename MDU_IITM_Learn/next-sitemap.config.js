/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mduiitmlearn.app",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/dashboard/*"],

  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.mduiitmlearn.app/sitemap.xml"
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },

  additionalPaths: async (config) => [
    { loc: "/about", lastmod: new Date().toISOString() },
    { loc: "/Aboutpage", lastmod: new Date().toISOString() },
    { loc: "/auth/signin", lastmod: new Date().toISOString() },
    { loc: "/blog", lastmod: new Date().toISOString() },
    { loc: "/blog-details", lastmod: new Date().toISOString() },
    { loc: "/cgpa", lastmod: new Date().toISOString() },
    { loc: "/community/notes", lastmod: new Date().toISOString() },
    { loc: "/community/projects", lastmod: new Date().toISOString() },
    { loc: "/contact", lastmod: new Date().toISOString() },
    { loc: "/notes", lastmod: new Date().toISOString() },
    { loc: "/privacy-policy", lastmod: new Date().toISOString() },
    { loc: "/pyqs", lastmod: new Date().toISOString() },
    { loc: "/Syllabus", lastmod: new Date().toISOString() },
    { loc: "/Terms-Conditions", lastmod: new Date().toISOString() },
    { loc: "/youtube-explanation/semester", lastmod: new Date().toISOString() },
  ],
};
