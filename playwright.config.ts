import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  retries: 3,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    viewport: {width: 1920, height: 1080},
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'off',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
