import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    ignores: [
      '.next/**/*',
      '**/.next/**/*',
      '**/node_modules/**/*',
      '**/dist/**/*',
      '**/build/**/*',
    ],
  },
];
