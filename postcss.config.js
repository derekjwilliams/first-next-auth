const fs = require('fs');
const path = require('path');
const projectRoot = __dirname;

module.exports = ({
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'src/app/**/*.{js,jsx,ts,tsx}',
        'src/components/**/*.{js,jsx,ts,tsx}',
        'node_modules/@stylexjs/open-props/**/*.{js,mjs}'
      ],
      useCSSLayers: false, // required for tailwind to play nicely, if it is required to be true, then update next.config.js to set extractCSS to true, which increases payload a little
      rsOptions: {
        aliases: {
          '@/*': [
            path.join(projectRoot, './src/*'),
          ],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: projectRoot,
        },
        isDev: process.env.NODE_ENV === 'development',
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
      extractCSS: false,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
})

