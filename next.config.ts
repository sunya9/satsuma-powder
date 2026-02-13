import settings from "./site.json" with { type: "json" };
import { type NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: false,
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: settings.settings.icon },
      { source: "/favicon.png", destination: settings.settings.icon },
      { source: "/rss", destination: "/rss.xml" },
    ];
  },
};

export default config;
