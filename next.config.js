/** @type {import('next').NextConfig} */
stylexPlugin = require('@stylexjs/nextjs-plugin')
const nextConfig = {
  optimizeFonts: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos.zillowstatic.com',
        port: '',
        pathname: '/fp/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.co',
        port: '',
        pathname: '/rcp-prod-uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'alysmxvvutkmqugooylp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/marigold-rental-images/**',
      },
    ],
    formats: ['image/webp'],
  },
}

module.exports = stylexPlugin({
  useCSSLayers: true,
  rootDir: __dirname,
})(nextConfig)
