// Smart Tailwind CSS Configuration Resolver
// Automatically detects build environment and returns appropriate configuration

import { vendemasTailwindConfig } from './index';
import { vendemasTailwindV3Config } from './v3-config';

// Detect build environment
const isAngularBuild = () => {
  return (
    process.env.NX_TASK_TARGET_PROJECT?.includes('angular') ||
    (process.env.NODE_ENV === 'production' &&
      (process.argv.includes('@angular/build') ||
        process.argv.includes('angular')))
  );
};

const isNextJsBuild = () => {
  return (
    process.env.NX_TASK_TARGET_PROJECT?.includes('next') ||
    process.argv.includes('next') ||
    process.argv.includes('@nx/next')
  );
};

// Smart configuration resolver
export const getTailwindConfig = () => {
  if (isAngularBuild()) {
    console.log('🔧 Using Tailwind CSS v3 configuration for Angular build');
    return vendemasTailwindV3Config;
  }

  if (isNextJsBuild()) {
    console.log('🚀 Using Tailwind CSS v4 configuration for Next.js build');
    return vendemasTailwindConfig;
  }

  // Default to v4 for modern features
  console.log('⚡ Using Tailwind CSS v4 configuration (default)');
  return vendemasTailwindConfig;
};

// Export both configurations for manual use
export { vendemasTailwindConfig, vendemasTailwindV3Config };
