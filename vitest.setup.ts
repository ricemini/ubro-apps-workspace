// Vitest setup file for global test configuration
import { beforeAll, afterAll, afterEach } from 'vitest';

// Global test setup
beforeAll(() => {
  // Setup global test environment
  process.env.NODE_ENV = 'test';
});

// Global test cleanup
afterEach(() => {
  // Clean up after each test
});

afterAll(() => {
  // Clean up after all tests
});
