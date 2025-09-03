import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      // Dependencies
      '**/node_modules/**',
      '**/.pnpm-store/**',

      // Build outputs
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/coverage/**',

      // Cache directories
      '**/.angular/**',
      '**/.nx/**',
      '**/tmp/**',
      '**/.cache/**',
      '**/cache/**',

      // Mobile
      '**/android/**',
      '**/ios/**',
      '**/www/**',
      '**/.expo/**',
      '**/web-build/**',

      // Generated files
      '**/*.min.js',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',

      // Apps specific
      '**/apps/*/dist/**',
      '**/apps/*/.next/**',
      '**/apps/*/build/**',
      '**/libs/*/dist/**',
      '**/libs/*/build/**',
      '**/packages/*/node_modules/**',
      '**/packages/*/dist/**',
      '**/packages/*/build/**',
      '**/tools/*/node_modules/**',
      '**/tools/*/dist/**',
      '**/tools/*/build/**',

      // Angular specific
      '**/angular/**',
      '**/packages/angular/**',
      '**/node_modules/@angular/**',
      '**/node_modules/zone.js/**',
      '**/node_modules/rxjs/**',

      // Test files (optional - uncomment if you want to exclude tests)
      // '**/*.test.ts',
      // '**/*.test.tsx',
      // '**/*.spec.ts',
      // '**/*.spec.tsx',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        JSX: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        document: 'readonly',
        HTMLFormElement: 'readonly',
        URL: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        // Add HTML element types to fix the 'not defined' errors
        HTMLButtonElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLSpanElement: 'readonly',
        HTMLUListElement: 'readonly',
        HTMLLIElement: 'readonly',
        HTMLTableElement: 'readonly',
        HTMLTableSectionElement: 'readonly',
        HTMLTableRowElement: 'readonly',
        HTMLTableCellElement: 'readonly',
        HTMLTableCaptionElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        HTMLHeadingElement: 'readonly',
        HTMLOListElement: 'readonly',
        KeyboardEvent: 'readonly',
        React: 'readonly',
        // Add Angular and other globals
        Node: 'readonly',
        ngDevMode: 'readonly',
        ngJitMode: 'readonly',
        Zone: 'readonly',
        PerformanceObserver: 'readonly',
        performance: 'readonly',
        NOOP_AFTER_RENDER_REF: 'readonly',
        // Add test globals
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        // Add browser globals
        self: 'readonly',
        chunkId: 'readonly',
        restriction: 'readonly',
        opts: 'readonly',
        appRef: 'readonly',
        injector: 'readonly',
        value: 'readonly',
        _M: 'readonly',
        _: 'readonly',
        T: 'readonly',
        actionTypes: 'readonly',
        navigator: 'readonly',
      },
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'prefer-template': 'error',
    },
  },
  prettier,
];
