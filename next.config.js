/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["github.com", "ipfs.infura.io"],
  },
};

module.exports = nextConfig;
