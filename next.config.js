/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io'],
  },
  sassOptions: {
    includePaths: ['styles'],
    prependData: `@import "./mixins.scss";`
  },
  experimental: {
    images: {
        allowFutureImage: true
    }
  }
}

module.exports = nextConfig
