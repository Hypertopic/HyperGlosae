import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['build'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      //...js.configs.recommended.rules,
      //...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      //...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'object-shorthand': 2,
      'brace-style': 2,
      'jsx-quotes': 2,
      quotes: [2, 'single'],
      'keyword-spacing': 2,
      'no-else-return': 2,
      'space-infix-ops': 2,
      'comma-spacing': 2,
      'key-spacing': 2,

      semi: [2, 'always', {
        omitLastInOneLineBlock: true,
      }],

      'no-multiple-empty-lines': [2, {
        max: 1,
      }],

      'no-multi-spaces': 2,
      'no-trailing-spaces': 2,
      'no-spaced-func': 2,
      'space-before-blocks': 2,
      'space-in-parens': [2, 'never'],

      indent: [2, 2, {
        SwitchCase: 1,
      }],

      'no-mixed-spaces-and-tabs': 2,
    },
  }
];
