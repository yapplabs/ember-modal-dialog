'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  globals: {
    globalThis: 'readonly',
  },
  rules: {
    'no-setter-return': 'off',
    'ember/classic-decorator-no-classic-methods': 'warn',
    'ember/classic-decorator-hooks': 'warn',
    'ember/no-actions-hash': 'warn',
    'ember/no-classic-classes': 'warn',
    'ember/no-classic-components': 'warn',
    'ember/no-component-lifecycle-hooks': 'warn',
    'ember/no-computed-properties-in-native-classes': 'warn',
    'ember/no-get': 'warn',
    'ember/no-observers': 'warn',
    'ember/require-computed-macros': 'warn',
    'ember/require-tagless-components': 'warn',
    'ember/no-jquery': 'error',
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './tests/dummy/config/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
