/**
 * Examples loaded via file:// (no dev server).
 * Chromium-only — firefox/webkit add ~600 MB each.
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Per-run artifacts go outside the project (bind-mount overlay-fs in some
  // devcontainers corrupts when playwright cleans up its temp dirs in-tree).
  outputDir: '/tmp/jds-playwright/test-results',
  fullyParallel: true,
  reporter: process.env.CI
    ? 'github'
    : [
        ['list'],
        [
          'html',
          { outputFolder: '/tmp/jds-playwright/playwright-report', open: 'never' },
        ],
      ],
  use: {
    // file:// URLs don't need a baseURL; spec files compose paths from __dirname.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
