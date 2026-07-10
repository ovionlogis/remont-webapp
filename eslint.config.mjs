import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
  {
    name: 'js/config',
    ...js.configs.recommended
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  rules.base.importsStrict
]);

const nextConfig = defineConfig([
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  plugins.next,
  ...configs.next.recommended,
  rules.react.strict
]);

const typescriptConfig = defineConfig([
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript.typescriptEslintStrict,
  ...configs.next.typescript
]);

const customOverrides = [{
  name: 'custom/overrides',
  files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  rules: {
    // Next.js specific
    '@next/next/no-img-element': 'off',

    // TypeScript ESLint rules (non-stylistic)
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/promise-function-async': 'off',

    // TypeScript Stylistic rules (migrated to @stylistic)
    '@stylistic/ts/comma-dangle': 'off',
    '@stylistic/ts/space-before-function-paren': 'off',

    // General code style (non-stylistic)
    'array-callback-return': 'warn',
    'arrow-body-style': 'warn',
    camelcase: ['error', {
      ignoreDestructuring: true,
      ignoreGlobals: true,
      ignoreImports: true,
      properties: 'never'
    }],
    'consistent-this': 'error',
    curly: ['error', 'all'],
    'dot-notation': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-irregular-whitespace': ['warn', { skipTemplates: true }],
    'no-multi-str': 'error',
    'no-plusplus': 'off',
    'no-restricted-exports': ['error', {
      restrictedNamedExports: ['then']
    }],
    'no-restricted-syntax': [
      'error',
      {
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        selector: 'LabeledStatement'
      },
      {
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        selector: 'WithStatement'
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      args: 'after-used',
      ignoreRestSiblings: false,
      vars: 'all',
      caughtErrors: 'none'
    }],
    'no-with': 'error',
    'one-var': ['error', 'never'],
    yoda: 'error',

    // Stylistic rules (migrated to @stylistic)
    '@stylistic/array-bracket-spacing': 'off',
    '@stylistic/arrow-parens': 'warn',
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/comma-spacing': 'error',
    '@stylistic/comma-style': 'error',
    '@stylistic/eol-last': 'error',
    '@stylistic/function-paren-newline': 'off',
    '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
    '@stylistic/key-spacing': 'error',
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/lines-around-comment': ['warn', {
      allowBlockStart: true,
      allowClassStart: true,
      beforeBlockComment: true,
      beforeLineComment: false
    }],
    '@stylistic/max-len': 'off',
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    '@stylistic/no-multiple-empty-lines': 'error',
    '@stylistic/function-call-spacing': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/object-curly-newline': 'warn',
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/semi': 'error',
    '@stylistic/semi-spacing': 'error',
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/space-before-function-paren': ['error', 'never'],
    '@stylistic/space-in-parens': 'error',
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/space-unary-ops': ['error', {
      nonwords: false,
      words: false
    }],
    '@stylistic/wrap-iife': 'error',

    // Import rules (using import-x)
    'import-x/no-namespace': 'off',
    'import-x/no-rename-default': 'off',
    'import-x/no-useless-path-segments': 'off',
    'import-x/order': ['warn', {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc'
      },
      distinctGroup: false,
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
      'newlines-between': 'always',
      pathGroups: [
        {
          group: 'external',
          pattern: 'react+(-*|)',
          position: 'before'
        },
        {
          group: 'index',
          pattern: '*.+(css|scss)',
          patternOptions: { matchBase: true },
          position: 'after'
        }
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      warnOnUnassignedImports: true
    }],
    'import-x/prefer-default-export': 'off',

    // React Hooks
    'react-hooks/exhaustive-deps': 'warn',

    // React rules
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': ['warn', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': ['warn', 'syntax'],
    'react/jsx-max-props-per-line': ['warn', { maximum: 1 }],
    'react/jsx-no-bind': ['warn', {}],
    'react/jsx-no-leaked-render': 'off',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': ['warn', {
      callbacksLast: true,
      ignoreCase: true,
      noSortAlphabetically: true,
      reservedFirst: true,
      shorthandFirst: false,
      shorthandLast: false
    }],
    'react/no-unknown-property': ['error', {
      ignore: ['css', 'jsx', 'global']
    }],
    'react/no-unused-state': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 'warn',
    'react/state-in-constructor': ['warn', 'never'],

    // JSX a11y rules
    'jsx-a11y/anchor-is-valid': ['warn', {
      aspects: ['invalidHref', 'preferButton'],
      components: ['Link'],
      specialLink: ['to']
    }],
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/label-has-associated-control': ['warn', {
      required: { some: ['nesting', 'id'] }
    }],
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-static-element-interactions': 'warn'
  }
}];

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...nextConfig,
  ...typescriptConfig,
  ...customOverrides
]);
