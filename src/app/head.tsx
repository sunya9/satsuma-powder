import { GoogleAnalytics } from "../componments/GoogleAnalytics";
import { config } from "../lib/config";
import { Canonical } from "../lib/head";
import { isDev } from "../lib/util";

export default function Head() {
  return (
    <>
      <link rel="icon" type="image/png" href={config.icon} />
      <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <Canonical relativePath="" />
      <link rel="next" href="/blog" />
      {isDev && <GoogleAnalytics />}
    </>
  );
}
