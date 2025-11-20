import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  //General settings
  testDir: './tests',
  timeout: 30000,
  
  //Parallel execution
  fullyParallel: true,
  workers: 1,

  //Retry logic
  retries: process.env.CI ? 2 : 0,

  //Reporting
  reporter: 'html',

  //Base test settings
  use: {
    baseURL: 'http://training.skillo-bg.com:4300/posts/all',
    headless: false,

    //Debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  //Browsers
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
  
  outputDir: 'test-results'
});

