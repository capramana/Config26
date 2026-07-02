import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/memento/book",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
