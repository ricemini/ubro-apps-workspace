#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const outputDir = path.join(process.cwd(), 'dist/vendemas-landing-web');
const nextDir = path.join(outputDir, '.next');
const routesManifestPath = path.join(nextDir, 'routes-manifest.json');
const targetRoutesManifestPath = path.join(outputDir, 'routes-manifest.json');

console.log('🔧 Fixing Vercel build output structure...');

// Check if routes-manifest.json exists in .next directory
if (fs.existsSync(routesManifestPath)) {
  console.log('✅ Found routes-manifest.json in .next directory');
  
  // Copy routes-manifest.json to the root of output directory
  try {
    fs.copyFileSync(routesManifestPath, targetRoutesManifestPath);
    console.log('✅ Copied routes-manifest.json to output root');
  } catch (error) {
    console.error('❌ Failed to copy routes-manifest.json:', error.message);
    process.exit(1);
  }
} else {
  console.error('❌ routes-manifest.json not found in .next directory');
  console.log('Expected path:', routesManifestPath);
  process.exit(1);
}

console.log('✅ Vercel build structure fixed successfully!');
