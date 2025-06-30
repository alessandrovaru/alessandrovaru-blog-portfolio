/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'lpdtapi.s3.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'lpdtapi.s3.us-east-1.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
        {
          protocol: 'https',
          hostname: 'cdn.prod.website-files'
        }
      ]
    }
  }

module.exports = nextConfig
