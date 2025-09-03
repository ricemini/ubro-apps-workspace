/**
 * Trust data for the VendeMás platform
 * Provides social proof and trust indicators for users
 */

export const TRUST = {
  rating: 4.8,
  reviewCount: 1250,
  activeVendors: 2500,
  securityFeatures: ['CoDi', 'SSL', 'PCI DSS'],
  certifications: ['ISO 27001', 'SOC 2'],
  risk: {
    noCard: true,
    noLockIn: true,
    quickStart: true,
  },
} as const;

export type TrustData = typeof TRUST;
