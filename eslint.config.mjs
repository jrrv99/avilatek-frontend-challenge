import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import prettier from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettier,
  {
    // Global ignores - equivalent to .eslintignore
    ignores: [
      // Dependencies
      'node_modules/**',
      '.pnp/**',
      '.pnp.js',

      // Testing
      'coverage/**',

      // Next.js
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',

      // Misc
      '.DS_Store',
      '*.pem',

      // Debug
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      // Local env files
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',

      // Turbo
      '.turbo/**',

      // Vercel
      '.vercel/**',

      // Configuration files (for TypeScript rules)
      'eslint.config.mjs',
      'next.config.js',
      'tailwind.config.js',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // 🎨 Prettier
      'prettier/prettier': 'warn',

      // ⚛️ React specific
      'react/jsx-key': 'warn',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/button-has-type': 'warn',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandLast: true,
          noSortAlphabetically: true,
        },
      ],
      'react/react-in-jsx-scope': 'off',

      // 📦 Imports
      'import/prefer-default-export': 'off',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      // 🔧 General
      'no-console': 'warn',
      'no-else-return': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'warn',
      'arrow-body-style': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-restricted-exports': ['error', { restrictedNamedExports: ['then'] }],
      'no-unused-var': 'off',
      'no-shadow': 'off',

      // 📘 TypeScript specific
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-shadow': ['error'],

      // 🌐 Accessibility
      'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    // Special configuration for JS/MJS configuration files
    files: ['eslint.config.mjs', 'next.config.js', 'tailwind.config.js'],
    languageOptions: {
      parserOptions: {
        // Do not use project for these files
        project: null,
      },
    },
    rules: {
      // Disable specific TypeScript rules for JS files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // Enable equivalent JS rules
      'no-unused-vars': 'warn',
      'no-shadow': 'warn',
    },
  },
];
