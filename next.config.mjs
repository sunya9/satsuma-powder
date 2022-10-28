/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_GA_ID: "UA-10104011-9",
    NEXT_PUBLIC_SITE_URL: "https://private.unsweets.net",
  },
  rewrites() {
    return [{ source: "/p/:uuid", destination: "/api/preview/:uuid" }];
  },
};

export default config;
