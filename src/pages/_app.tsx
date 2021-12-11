import type { AppProps } from "next/app";
import "normalize.css";
import "sakura.css";
import "../cards.css";
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
        <Head>
          <link rel="icon" type="image/png" href={config.icon} />
          <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="format-detection" content="telephone=no" />
        </Head>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
