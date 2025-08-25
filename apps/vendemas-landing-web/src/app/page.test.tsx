import { describe, it, expect, vi } from 'vitest';

// Mock the server actions
vi.mock('./actions', () => ({
  getVendorStats: vi.fn().mockResolvedValue({
    totalVendors: 1000,
    totalSales: 2000000,
    activeUsers: 500,
  }),
  getServerTime: vi.fn().mockResolvedValue('January 1, 2024, 12:00:00 PM'),
}));

describe('Page Component', () => {
  it('should have proper metadata', async () => {
    const { metadata } = await import('./page');
    expect(metadata.title).toBe('Vendemás - Mobile Sales Toolkit for Street Vendors');
    expect(metadata.description).toContain('Vendemás - Empowering street vendors');
  });

  it('should export a default function', async () => {
    const Page = (await import('./page')).default;
    expect(typeof Page).toBe('function');
    expect(Page.name).toBe('HomePage');
  });

  it('should be an async function', async () => {
    const Page = (await import('./page')).default;
    const result = Page();
    expect(result).toBeInstanceOf(Promise);
  });
});
