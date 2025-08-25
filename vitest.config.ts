import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '.next/',
        '.nuxt/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/test-utils/**',
        '**/__tests__/**',
        '**/__mocks__/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@vendemas': resolve(__dirname, './libs'),
    },
  },
});
