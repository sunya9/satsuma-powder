import type { AppProps } from "next/app";
import "water.css/out/light.css";
import "../cards.css";
import "../main.css";
import Script from "next/script";
import { GA_TRACKING_ID, useGtag } from "../lib/gtag";
import Head from "next/head";
import { config } from "../lib/config";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useGtag();
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <link rel="icon" type="image/png" href={config.icon} />
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
