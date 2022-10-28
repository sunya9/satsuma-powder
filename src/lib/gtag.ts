import { useRouter } from "next/router";
import { useEffect } from "react";
import { env } from "./env";
import { isDev } from "./util";

export const GA_TRACKING_ID = env.gaId;

export const pageview = (url: string) => {
  if (isDev) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const useGtag = () => {
  const router = useRouter();
  useEffect(() => {
    if (isDev) return;
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
