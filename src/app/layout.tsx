import * as React from "react";
import "./main.css";
import "./cards.css";
import { config } from "../lib/config";
import { isDev } from "../lib/util";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="ja">
      <head>
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
      </head>
      <body>{children}</body>
      {!isDev && <GoogleAnalytics gaId="G-QTR9Z69TYK" />}
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  description: config.description,
  metadataBase: new URL(config.url),
  icons: config.icon,
  archives: "/blog",
  alternates: {
    canonical: config.url,
    types: {
      "application/rss+xml": [
        {
          title: `${config.title}のRSS`,
          url: "/rss.xml",
        },
      ],
    },
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    siteName: config.title,
    url: config.url,
    type: "website",
  },
};
