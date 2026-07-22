// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const tsEslintParser = require('@typescript-eslint/parser');

module.exports = defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'only-multiline',
        'functions': 'always-multiline',
      }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
    },
  },
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    languageOptions: {
      parser: tsEslintParser,
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
    },
  },
]);
