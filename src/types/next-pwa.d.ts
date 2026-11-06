declare module "next-pwa" {
  import type { NextConfig } from "next";

  type RuntimeCaching = {
    urlPattern: RegExp | ((context: { request: Request; url: URL }) => boolean);
    handler: "CacheFirst" | "NetworkFirst" | "StaleWhileRevalidate";
    options?: {
      cacheName?: string;
      networkTimeoutSeconds?: number;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
    };
  };

  type PwaConfig = {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    clientsClaim?: boolean;
    runtimeCaching?: RuntimeCaching[];
  };

  const withPWA: (config: PwaConfig) => (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
