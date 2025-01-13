/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

/** @type {import('next').NextConfig} */

const path = require('path');
const stylexPlugin = require('@stylexswc/nextjs-plugin');
const rootDir = __dirname;

module.exports = stylexPlugin({
  // Add any StyleX options here
  rsOptions: {
    aliases: {
      '@/*': [
        path.join(rootDir, '*'),
      ],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
    },
  },
  // extractCSS: true seems to be needed for tailwind to work correctly 
  // for development, penalty may be larger css bundle and build time, and 
  // bad css source map
  // TODO: see if the swc maintainer has a way around this.

  // Verified that this is the case:
  //   with extractCSS: false: only one CSS file is downloaded (about 17.3 kB)
  //   with extractCSS: true: only two CSS files are downloaded (first about 17.3 kB, second about 6.2 kB)
  //   it seems that the larger file is open-props+tailwind, small file is only open-props
  //   
  // the larger file has layers, e.g. starts with:
  //     @layer priority1, priority2, priority3, priority4, priority5;@layer priority1 { .xopmwyx,:root {...
  // the smaller file does not have layers, e.g. starts with 
  //     .xopmwyx,:root {
  // Not a show stopper for now

  extractCSS: true //process.env.NODE_ENV === 'development' ? true : false
})({
  transpilePackages: ['@stylexjs/open-props'],
  // Optionally, add any other Next.js config below, e.g. 
});