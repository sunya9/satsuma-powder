"use client";

import { env } from "./env";

export const GA_TRACKING_ID = env.gaId;

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
