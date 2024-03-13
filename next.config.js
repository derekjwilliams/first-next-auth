/** @type {import('next').NextConfig} */

const stylexPlugin = require('@stylexjs/nextjs-plugin')
const nextConfig = {
  optimizeFonts: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = stylexPlugin({
  rootDir: __dirname,
})(nextConfig)
