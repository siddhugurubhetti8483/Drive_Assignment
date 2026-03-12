const { test, expect } = require("@playwright/test");
const { PhotopeaPage } = require("../pages/PhotopeaPage");

test.describe("Photopea Automation - Part 1", () => {
  let photopeaPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      acceptDownloads: true,
    });

    const page = await context.newPage();

    photopeaPage = new PhotopeaPage(page);
  });

  test("Open Photopea website", async () => {
    await photopeaPage.createDocument();

    await expect(photopeaPage.page.locator("canvas")).toBeVisible();

    console.log("Photopea website opened successfully");
  });
});
