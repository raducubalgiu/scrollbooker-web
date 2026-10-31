import { defineConfig, devices } from "@playwright/test";
import { BACKEND_URL, WEB_URL } from "./e2e/support/env";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: WEB_URL,
    locale: "ro-RO",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "bash e2e/scripts/start-backend.sh",
      url: `${BACKEND_URL}/health`,
      timeout: 120_000,
      reuseExistingServer: false,
    },
    {
      command: "npx next dev --turbopack -p 3001",
      url: `${WEB_URL}/auth/signin`,
      timeout: 180_000,
      reuseExistingServer: false,
      env: {
        NEXT_DIST_DIR: ".next-e2e",
        NEXT_PUBLIC_BE_BASE_ENDPOINT: BACKEND_URL,
        NEXTAUTH_URL: WEB_URL,
      },
    },
  ],
});
