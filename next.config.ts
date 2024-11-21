// import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
// export default nextConfig;
