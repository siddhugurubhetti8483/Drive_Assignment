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

  test("TC01: Open Photopea website", async () => {
    await photopeaPage.openPhotopea();
    await expect(
      photopeaPage.page
        .getByRole("button", { name: "Start using Photopea" })
        .first(),
    ).toBeVisible();
  });

  test("TC02: Editor", async () => {
    await photopeaPage.clickStartPhotopea();

    await expect(photopeaPage.page.getByText("New Project")).toBeVisible();
  });

  test("TC03: Open New Project dialog", async () => {
    await photopeaPage.clickNewProject();

    await expect(
      photopeaPage.page.getByRole("button", { name: "Create" }),
    ).toBeVisible();
  });

  test("TC04: Values", async () => {
    await photopeaPage.fillAndCreate();

    await expect(photopeaPage.page.locator("canvas").first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("TC05: Red Rectangle", async () => {
    await photopeaPage.addRedRectangle();
    await expect(photopeaPage.page.locator("canvas").first()).toBeVisible();
  });

  test("TC06: Green Triangle", async () => {
    await photopeaPage.addGreenTriangle();
    await expect(photopeaPage.page.locator("canvas").first()).toBeVisible();
  });

  test("TC07: Blue Circle", async () => {
    await photopeaPage.addBlueCircle();
    await expect(photopeaPage.page.locator("canvas").first()).toBeVisible();
  });
});
