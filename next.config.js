/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  assetPrefix: "/o2i/",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
