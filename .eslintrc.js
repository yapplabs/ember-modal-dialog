module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  plugins: [
    'ember'
  ],
  rules: {
    'ember/new-module-imports': 'error',
    'ember/no-jquery': 'error'
  }
};
