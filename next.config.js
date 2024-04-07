/** @type {import('next').NextConfig} */

const stylexPlugin = require('@stylexjs/nextjs-plugin')
const nextConfig = {
  optimizeFonts: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = stylexPlugin({
  rootDir: __dirname,
})(nextConfig)

/*
Possible that this needs to be expanded, see:

https://github.com/facebook/stylex/blob/main/apps/nextjs-example/next.config.js

 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 *

/ ** @type {import('next').NextConfig} * / <== NOTE remove spaces in comment if using this
const path = require('path');
const stylexPlugin = require('@stylexjs/nextjs-plugin');
const babelrc = require('./.babelrc.js');
const plugins = babelrc.plugins;
const [_name, options] = plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === '@stylexjs/babel-plugin',
);
const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname;
const aliases = options.aliases ?? undefined;
const useCSSLayers = options.useCSSLayers ?? undefined;

module.exports = stylexPlugin({ rootDir, aliases, useCSSLayers })({
  transpilePackages: ['@stylexjs/open-props'],
});
*/
