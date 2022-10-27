/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_GA_ID: "UA-10104011-9",
  },
  rewrites() {
    return [{ source: "/p/:uuid", destination: "/api/preview/:uuid" }];
  },
};

export default config;
