import { config } from "./config";

export const canonicalUrl = (relativePath: string) =>
  `${config.url}${relativePath}`;

export const isDev = process.env.NODE_ENV !== "production";
