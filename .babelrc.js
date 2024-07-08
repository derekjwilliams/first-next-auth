const path = require('path')
module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-transform-private-methods'],
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    ],
  ],
  env: {
    development: {
      compact: false,
    },
    production: {
      compact: false,
    }
  },
}
