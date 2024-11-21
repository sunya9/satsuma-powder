import * as React from "react";
import "./main.css";
import "./cards.css";
import { GoogleAnalytics } from "../componments/GoogleAnalytics";
import { config } from "../lib/config";
import { isDev } from "../lib/util";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="ja">
      <head>
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        {!isDev && <GoogleAnalytics />}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  metadataBase: new URL(config.url),
  icons: config.icon,
  archives: "/blog",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  formatDetection: {
    telephone: false,
  },
};
