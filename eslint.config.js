import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  prettierRecommended,
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      jsdoc.configs['flat/recommended-typescript-error'],
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries
    },
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'app'
        },
        {
          type: 'pages',
          pattern: 'src/pages/*',
          capture: ['page']
        },
        {
          type: 'widgets',
          pattern: 'widgets/*',
          capture: ['widget']
        },
        {
          type: 'features',
          pattern: 'features/*',
          capture: ['feature']
        },
        {
          type: 'entities',
          pattern: 'entities/*',
          capture: ['entity']
        },
        {
          type: 'shared',
          pattern: 'shared/*',
          capture: ['segment']
        }
      ]
    },
    rules: {
      // JS
      complexity: [2, 9],
      'max-params': [2, 4],
      'max-lines-per-function': [2, 250],
      'max-nested-callbacks': [2, 4],
      semi: 2,
      'eol-last': 2,
      'no-unsafe-optional-chaining': 0,
      'no-param-reassign': 2,
      'array-callback-return': [2, { checkForEach: false }],
      'sort-imports': [
        2,
        {
          ignoreCase: true,
          allowSeparatedGroups: true
        }
      ],
      'max-len': [2, { code: 130 }],
      'default-case': 0,
      'import/extensions': [
        2,
        'never',
        {
          json: 'always',
          css: 'always',
          png: 'always',
          svg: 'always',
          webp: 'always'
        }
      ],
      'import/prefer-default-export': 0,
      'no-useless-return': 0,
      'no-bitwise': 0,
      'no-console': 2,
      'consistent-return': 0,
      'object-curly-spacing': [2, 'always'],
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      'keyword-spacing': [
        2,
        {
          before: true,
          after: true
        }
      ],
      'import/no-extraneous-dependencies': [
        2,
        {
          devDependencies: [
            '**/_tests/**',
            './vite.config.ts',
            './vitest.config.ts',
            './eslint.config.js'
          ]
        }
      ],
      // TS
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-interface': [
        2,
        { allowSingleExtends: true }
      ],
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': 2,
      // React
      'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
      'react/function-component-definition': [
        2,
        { namedComponents: 'arrow-function' }
      ],
      'react/display-name': 0,
      'react/require-default-props': 0,
      'react/jsx-boolean-value': 0,
      'react/jsx-no-duplicate-props': 2,
      'react/jsx-no-undef': 2,
      'react/jsx-sort-props': 0,
      'react/jsx-uses-vars': 2,
      'react/no-multi-comp': 0,
      'react/no-string-refs': 2,
      'react/prop-types': 0,
      'react/self-closing-comp': 2,
      'react/jsx-indent-props': [2, 'first'],
      'react/jsx-props-no-multi-spaces': 2,
      'react/jsx-props-no-spreading': [0],
      'react-refresh/only-export-components': 0,
      'react/jsx-no-useless-fragment': 2,
      // JSDOC
      'jsdoc/require-jsdoc': [
        2,
        {
          require: {
            ArrowFunctionExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true
          }
        }
      ],
      'jsdoc/require-returns': [0],
      // FSD
      'boundaries/entry-point': [
        2,
        {
          default: 'disallow',
          rules: [
            {
              target: [['shared', { segment: 'lib' }]],
              allow: '*/index.ts'
            },
            {
              target: [['shared', { segment: 'lib' }]],
              allow: '*.(ts|tsx)'
            },
            {
              target: [['shared', { segment: 'constants' }]],
              allow: 'index.(ts|tsx)'
            },
            {
              target: [['shared', { segment: '(ui|api|types)' }]],
              allow: '**'
            },
            {
              target: ['app', 'pages', 'widgets', 'features', 'entities'],
              allow: 'index.(ts|tsx)'
            }
          ]
        }
      ],
      'boundaries/element-types': [
        2,
        {
          default: 'allow',
          message: '${file.type} is not allowed to import (${dependency.type})',
          rules: [
            {
              from: ['shared'],
              disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
              message:
                'Shared module must not import upper layers (${dependency.type})'
            },
            {
              from: ['entities'],
              message:
                'Entity must not import upper layers (${dependency.type})',
              disallow: ['app', 'pages', 'widgets', 'features']
            },
            {
              from: ['entities'],
              message: 'Entity must not import other entity',
              disallow: [['entities', { entity: '!${entity}' }]]
            },
            {
              from: ['features'],
              message:
                'Feature must not import upper layers (${dependency.type})',
              disallow: ['app', 'pages', 'widgets']
            },
            {
              from: ['features'],
              message: 'Feature must not import other feature',
              disallow: [['features', { feature: '!${feature}' }]]
            },
            {
              from: ['widgets'],
              message:
                'Feature must not import upper layers (${dependency.type})',
              disallow: ['app', 'pages']
            },
            {
              from: ['widgets'],
              message: 'Widget must not import other widget',
              disallow: [['widgets', { widget: '!${widget}' }]]
            },
            {
              from: ['pages'],
              message: 'Page must not import upper layers (${dependency.type})',
              disallow: ['app']
            },
            {
              from: ['pages'],
              message: 'Page must not import other page',
              disallow: [['pages', { page: '!${page}' }]]
            }
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['**/constants/**'],
    rules: {
      'max-lines': [2, { max: 350, skipBlankLines: true, skipComments: true }]
    }
  },
  {
    files: ['**/*.test.*'],
    rules: {
      'max-nested-callbacks': [2, 10],
      'jsdoc/require-jsdoc': 0
    }
  }
);
