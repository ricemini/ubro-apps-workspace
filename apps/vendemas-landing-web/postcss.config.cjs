const { join } = require('path');

// Next.js PostCSS configuration
// Uses Tailwind CSS v3 for consistency across the monorepo

/* eslint-disable no-undef */
module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.cjs'),
    },
    autoprefixer: {},
  },
};
