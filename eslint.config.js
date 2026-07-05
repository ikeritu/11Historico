import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist/**',
    'build/**',
    'node_modules/**',
    '.audit-dist/**',
    'reports/**',
    'patch_files/**',
    '**/*_FIXED.ts',
    '**/*.backup_*',
    '**/*.bak',
    '_export*/**',
  ]),
  {
    files: ['src/**/*.{ts,tsx}', 'scripts/**/*.ts', 'vite.config.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
])
