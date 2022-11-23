/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  // assetPrefix: "./",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
