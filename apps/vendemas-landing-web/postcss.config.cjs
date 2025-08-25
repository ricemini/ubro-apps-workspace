const { join } = require('path');

// Next.js PostCSS configuration
// Uses Tailwind CSS v4 for consistency across the monorepo

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: join(__dirname, 'tailwind.config.cjs'),
    },
    autoprefixer: {},
  },
};
