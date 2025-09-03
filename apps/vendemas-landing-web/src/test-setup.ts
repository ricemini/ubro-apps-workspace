// Test setup for vendemas-landing-web
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter(): {
    push: ReturnType<typeof vi.fn>;
    replace: ReturnType<typeof vi.fn>;
    prefetch: ReturnType<typeof vi.fn>;
    back: ReturnType<typeof vi.fn>;
    forward: ReturnType<typeof vi.fn>;
    refresh: ReturnType<typeof vi.fn>;
  } {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    };
  },
  useSearchParams(): URLSearchParams {
    return new URLSearchParams();
  },
  usePathname(): string {
    return '/';
  },
}));
