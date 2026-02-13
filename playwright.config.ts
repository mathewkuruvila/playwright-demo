import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'Auth Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', 
        storageState: '.auth/user.json',
      },
      testMatch: /sauce.spec.ts/,
      dependencies: ['setup'],
    },
    {
      name: 'Demo Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', 
      },
      testMatch: /fix.*.spec.ts/,
    },
    {
      name: 'Woolies Catalog Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', 
      },
      testMatch: /wool.*.spec.ts/,
    },
    {
      name: 'Sections Links Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      testMatch: /sections-links.*\.spec\.ts/,
    },
    {
      name: 'YouTube Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      testMatch: /.*seed\.spec\.ts/,
    },
    {
      name: 'ShareThis Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      testMatch: /sharethis.*\.spec\.ts/,
    },
    {
      name: 'JioMart Tests',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      testMatch: /jiomart.*\.spec\.ts/,
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
