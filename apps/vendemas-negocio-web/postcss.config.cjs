const { join } = require('path');

// Angular-specific PostCSS configuration
// Uses Tailwind CSS v3 plugin for compatibility with Angular's build system

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.cjs'),
    },
    autoprefixer: {},
  },
};
