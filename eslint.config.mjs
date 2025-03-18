import reactCompiler from 'eslint-plugin-react-compiler'
import stylexjs from '@stylexjs/eslint-plugin'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  // baseDirectory: import.meta.dirname,
  baseDirectory: __dirname,
  // recommendedConfig: js.configs.recommended,
  // allConfig: js.configs.all,
})

const eslintConfig = [
  {
    ignores: ['*.config/*', 'postcss.config.js', './src/app/customStyles/marigoldColors.stylex.d.ts'],
  },
  ...compat.config({ extends: ['next/core-web-vitals', 'next/typescript'] }),
  // ...compat.config({ extends: ['next/core-web-vitals'] }),
  {
    plugins: {
      'react-compiler': reactCompiler,
      '@stylexjs': stylexjs,
      '@tanstack/query': tanstackQuery,
    },
    overrides: [
      {
        files: ['next.config.js'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
        },
      },
    ],
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'prefer-const': 'warn',
      // '@stylexjs/valid-styles': 'error',
      // 'no-color-literals': 'off',
      // 'jsx-quotes': ['error', 'prefer-single'],
      // '@tanstack/query/exhaustive-deps': 'error',
      // '@tanstack/query/no-rest-destructuring': 'warn',
      // '@tanstack/query/stable-query-client': 'error',
      // 'react-compiler/react-compiler': 'error',
    },
  },
]

export default eslintConfig
