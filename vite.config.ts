import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
    sassDts({
      enabledMode: ['development'],
      esmExport: true,
    }),
    tsconfigPaths(),
  ],
  base: '',
  optimizeDeps: {
    include: [
      '@reduxjs/toolkit/query/react',
      '@reduxjs/toolkit',
      'react-redux',
      'js-cookie'
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
  server: {
    open: true,
  },
});
