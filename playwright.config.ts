import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Desactivado para evitar conflictos si se usan los mismos usuarios
  reporter: 'html',
  use: {
    baseURL: 'file://' + process.cwd() + '/BankingApp.html',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
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
      name: 'msedge',
      use: { ...devices['Desktop Edge'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },




  ],
});