/** @type {import('next').NextConfig} */
const stylexPlugin = require('@stylexswc/nextjs-plugin')
const rootDir = __dirname
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
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
  rsOptions: {
    dev: process.env.NODE_ENV !== 'production',
    useRemForFontSize: true,
    aliases: {
      '@/*': [path.join(rootDir, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir,
    },
  },
  useCssLayers: true,
  transformCss: async (css) => {
    const postcss = require('postcss')
    const result = await postcss([require('autoprefixer')]).process(css)
    return result.css
  },
})({
  ...nextConfig,
  transpilePackages: ['@stylexjs/open-props'],
})
