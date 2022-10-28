import { config } from "./config";

export const canonicalUrl = (relativePath: string) =>
  `${config.url}${relativePath}`;
