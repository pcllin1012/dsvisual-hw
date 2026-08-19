const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  
  use: {
    // 1. 設定基礎網址，這樣 page.goto('/#select-quickselect') 就知道要連去哪裡
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },

  // 2. 自動在測試前開啟 HTTP 伺服器
  webServer: {
    command: 'npx http-server . -p 8080', // 若專案是用其他 command (例如 npx serve 或 npm start) 可自行修改
    port: 8080,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});