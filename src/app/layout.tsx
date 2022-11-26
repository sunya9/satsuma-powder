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
        <link rel="icon" type="image/png" href={config.icon} />
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        {!isDev && <GoogleAnalytics />}
      </head>
      <body tabIndex={-1}>{children}</body>
    </html>
  );
}
