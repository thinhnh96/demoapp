import { defineConfig, devices } from '@playwright/test';
import { env } from './configs/env';

/**
 * Debug mode for loading env 
 * 
 */
console.log('✅ Playwright ENV loaded:', env);

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: env.isCI ? 2 : 0,

  workers: env.isCI ? 2 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: env.baseUrl,

    actionTimeout: env.timeouts.action,
    navigationTimeout: env.timeouts.navigation,

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',

    headless: true,
  },

  // sMulti-project
  projects: [
    // ========================
    // AUTH SETUP (SAVE SESSION)
    // ========================
    {
      name: 'setup-chrome',
      testMatch: /auth\.chrome\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'setup-firefox',
      testMatch: /auth\.firefox\.setup\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // ========================
    // LOGIN (NO SESSION)
    // ========================
    {
      name: 'login-chrome',
      testMatch: /login\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'login-firefox',
      testMatch: /login\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // ========================
    // ORDER FLOW (REUSE AUTH)
    // ========================
    {
      name: 'order-chrome',
      dependencies: ['setup-chrome'],
      testMatch: /order\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage/auth.chrome.json',
      },
    },
    {
      name: 'order-firefox',
      dependencies: ['setup-firefox'],
      testMatch: /order\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'storage/auth.firefox.json',
      },
    },
  ],
});
