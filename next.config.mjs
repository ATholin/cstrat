/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    // @ts-ignore Server Actions
    serverActions: true
  },
  images: {
    domains: ['community.cloudflare.steamstatic.com']
  }
};
export default config;
