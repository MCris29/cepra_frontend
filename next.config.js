/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const pathsConfig = {};

module.exports = {
  // assetPrefix: "/o2i/",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
