module.exports = {
  extends: 'next/core-web-vitals',
  plugins: ['@stylexjs'],
  rules: {
    '@stylexjs/valid-styles': 'error',
    'no-color-literals': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
  },
}
