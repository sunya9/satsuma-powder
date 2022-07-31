/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://private.unsweets.net",
  generateRobotsTxt: true,
  exclude: ["/preview"],
  generateIndexSitemap: false,
};

export default config;
