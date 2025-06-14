import js from '@eslint/js';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

/** @type {import('eslint').FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
];
