/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_GA_ID: "UA-10104011-9",
  },
  rewrites: () => [{ source: "/rss/", destination: "/rss.xml" }],
  redirects: () => [
    {
      source: "/:year(\\d{4,})/:month(\\d{2,})/:day(\\d{2,})/:slug",
      destination: "/blog/:slug",
      permanent: true,
    },
  ],
};
