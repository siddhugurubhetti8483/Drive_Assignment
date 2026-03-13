const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  timeout: 120000,

  retries: 1,

  workers: 1,

  reporter: [["html", { outputFolder: "reports", open: "never" }], ["list"]],

  use: {
    headless: false,

    launchOptions: {
      args: ["--start-maximized"],
    },

    viewport: null,

    actionTimeout: 30000,

    navigationTimeout: 60000,

    // viewport: { width: 1920, height: 1080 },

    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", channel: "chrome" },
    },
  ],
});
