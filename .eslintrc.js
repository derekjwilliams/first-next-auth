module.exports = {
  extends: 'next/core-web-vitals',
  plugins: ['eslint-plugin-react-compiler', '@stylexjs', '@tanstack/query'],
  rules: {
    'react-compiler/react-compiler': 'error',
    '@stylexjs/valid-styles': 'error',
    'no-color-literals': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
}
