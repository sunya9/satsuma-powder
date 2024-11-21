import { promises as fs } from "node:fs";

/** @type {{ settings: import('@tryghost/content-api').SettingsResponse}} */
const settings = JSON.parse(await fs.readFile("./site.json", "utf8"));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_GA_ID: "UA-10104011-9",
    NEXT_PUBLIC_SITE_URL: "https://private.unsweets.net",
  },
  rewrites() {
    return [
      { source: "/favicon.ico", destination: settings.settings.icon },
      { source: "/rss", destination: "/rss.xml" },
    ];
  },
  serverExternalPackages: ["@tryghost/content-api", "@tryghost/admin-api"],
};

export default config;
