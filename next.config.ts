import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.google.com"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:locale/r/:token",
          destination: "/:locale/redirect/:token",
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
