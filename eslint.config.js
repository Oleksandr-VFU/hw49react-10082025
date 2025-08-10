import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import vitest from 'eslint-plugin-vitest'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals // Додано глобальнізмінні Vitest (describe, test, expect тощо)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      React,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      vitest // Додано плагін Vitest для підтримки тестів
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      ...js.configs.recommended.rules,
      ...React.configs.recommended.rules,
      ...React.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...vitest.configs.recommended.rules, // Додано рекомендовані правила для Vitest
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true }]
    },
  },
])
