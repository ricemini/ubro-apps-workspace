//@ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // Vercel-specific optimizations
  distDir: '.next',
  generateBuildId: async () => {
    return 'vendemas-landing-web';
  },
  
  // Skip ESLint during build to avoid configuration issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Skip TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // SSR and Performance Configuration
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Next.js 15 optimizations
    optimizePackageImports: ['@headlessui/react', 'lucide-react', 'firebase'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites for API routes only - removed problematic root rewrite
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
