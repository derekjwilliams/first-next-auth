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
  // rootDir,
  // Add any Stylex options here
  // dev: process.env.NODE_ENV === 'development',
  // genConditionalClasses: true,
  // treeshakeCompensation: true,
  aliases: {
    '@/*': [path.join(rootDir, '*')],
  },
  unstable_moduleResolution: {
    type: 'commonJS',
    rootDir,
  },
})({
  transpilePackages: ['@stylexjs/open-props'],
  // Optionally, add any other Next.js config below
  // swcMinify: true,
})
// module.exports = stylexPlugin({
//   useCSSLayers: true,
//   rootDir: __dirname,
// })(nextConfig)
