/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

/** @type {import('next').NextConfig} */

const path = require('path')

const stylexPlugin = require('@stylexswc/nextjs-plugin')
const rootDir = __dirname

const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Add transpilePackages for StyleX dependencies
  transpilePackages: ['@stylexjs/open-props', '@derekjwilliams/stylextras-open-props-pr'],
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
      {
        protocol: 'https',
        hostname: '018i0wgyr2.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
    ],
    formats: ['image/webp'],
  },
}

module.exports = stylexPlugin({
  rootDir,
  rsOptions: {
    aliases: {
      '@/*': [path.join(rootDir, 'src/*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir,
    },
  },
  // Extract CSS in production, keep inline in development to reduce hydration mismatches
  extractCSS: process.env.NODE_ENV === 'production',
  // Add development-specific options to reduce hydration issues
  dev: process.env.NODE_ENV === 'development',
  // Ensure consistent style generation between server and client
  unstable_transformCSSModules: true,
})(nextConfig)
