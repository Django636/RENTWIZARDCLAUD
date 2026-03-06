/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@rentwizard/core', '@rentwizard/api-client', '@rentwizard/ui'],
};

module.exports = nextConfig;