/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@rentwizard/core', '@rentwizard/ui', '@rentwizard/api-client'],
  experimental: { serverActions: { enabled: true } },
};
module.exports = nextConfig;
