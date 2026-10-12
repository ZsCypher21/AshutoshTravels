import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The trip finder moved from /trips to /experiences; keep old links and bookmarks working.
  async redirects() {
    return [
      { source: "/trips", destination: "/experiences", permanent: true },
      { source: "/ja/trips", destination: "/ja/experiences", permanent: true },
      { source: "/en/trips", destination: "/experiences", permanent: true },
    ];
  },
};

export default nextConfig;
