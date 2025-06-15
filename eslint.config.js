import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignorer les fichiers buildés
  { ignores: ['dist', 'node_modules'] },

  // ✅ FRONTEND REACT : JSX, navigateur
  {
    files: ['src/**/*.{js,jsx}'], // uniquement dans le frontend
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // ✅ BACKEND NODE.JS : Express, Mongo, etc.
  {
    files: ['backend/**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // inclut process, __dirname, etc.
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn'],
      'no-undef': 'error',
    },
  },
]