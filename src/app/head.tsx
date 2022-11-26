import { config } from "../lib/config";
import { Canonical } from "../lib/head";

export default function Head() {
  return (
    <>
      <title>{config.title}</title>
      <Canonical relativePath="" />
      <link rel="next" href="/blog" />
    </>
  );
}
