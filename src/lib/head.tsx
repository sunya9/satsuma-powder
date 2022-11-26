import { config } from "./config";

export const Description = (props: { description?: string }) =>
  props.description ? (
    <meta name="description" content={props.description} />
  ) : null;

export const Canonical = (props: { relativePath: string }) => (
  <link rel="canonical" href={`${config.url}${props.relativePath}`} />
);
