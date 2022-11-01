import type { AppProps } from "next/app";
import "../cards.css";
import "../main.css";
import Script from "next/script";
import { GA_TRACKING_ID, useGtag } from "../lib/gtag";
import Head from "next/head";
import { config } from "../lib/config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isDev } from "../lib/util";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useGtag();
  const router = useRouter();
  useEffect(() => {
    const clearFocus = () => {
      if (!(document.activeElement instanceof HTMLElement)) return;
      document.activeElement.blur();
      // reset focus index
      document.body.focus({ preventScroll: true });
    };
    router.events.on("routeChangeComplete", clearFocus);
    return () => {
      router.events.off("routeChangeComplete", clearFocus);
    };
  }, [router.events]);
  return (
    <>
      {!isDev && (
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
        </>
      )}
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
