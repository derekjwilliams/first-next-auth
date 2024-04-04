module.exports = {
  extends: 'next/core-web-vitals',
  plugins: ['@stylexjs', '@tanstack/query'],
  rules: {
    '@stylexjs/valid-styles': 'error',
    'no-color-literals': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
}
