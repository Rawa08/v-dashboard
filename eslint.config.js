import js from '@eslint/js';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

/** @type {import('eslint').FlatConfig[]} */
export default [
  js.configs.recommended,

  // Jest files override
  {
    files: [
      '**/__tests__/**/*.{ts,tsx,js,jsx}',
      '**/?(*.)+(spec|test).{ts,tsx,js,jsx}',
    ],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    rules: {
    },
  },

  // types folder override
  {
    files: ['./src/types/**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // main config
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
        fetch: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        React: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'no-unused-vars': 'off',
      '@/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
