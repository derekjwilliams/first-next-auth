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
  // Add any StyleX options here
  rsOptions: {
    aliases: {
      '@/*': [path.join(rootDir, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
    },
    logLevel: 'debug',
  },
  extractCSS: true, //process.env.NODE_ENV === 'development' ? true : false
})({
  ...nextConfig,
  // transpilePackages: ['@stylexjs/open-props'],
  // Optionally, add any other Next.js config below, e.g.
})
