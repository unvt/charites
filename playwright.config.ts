// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'test/playwright',
  use: {
    browserName: 'chromium',
    headless: true,
  },
  workers: 3,
  webServer: [
    {
      command: 'dist/cli.js serve test/data/style.yml --port 8080',
      port: 8080,
    },
    {
      command:
        'dist/cli.js serve test/data/style.yml --provider geolonia --port 8088',
      port: 8088,
    },
  ],
}
export default config
