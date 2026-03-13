const config = require("../utils/config");

class PhotopeaPage {
  constructor(page) {
    this.page = page;
  }

  // Opening Photopea website
  async openPhotopea() {
    await this.page.goto(config.PHOTOPEA_URL);

    await this.page.waitForSelector("button:has-text('Start using Photopea')", {
      timeout: 30000,
    });

    console.log("Landing page load ho gaya");
  }

  async clickStartPhotopea() {
    console.log("Start using Photopea");

    await this.page
      .getByRole("button", { name: "Start using Photopea" })
      .first()
      .click();

    await this.page.waitForSelector("text=New Project", {
      timeout: 30000,
    });

    await this.page.waitForTimeout(1000);
  }

  async clickNewProject() {
    console.log("Click New Project");

    await this.page.getByText("New Project").click();

    await this.page.waitForSelector("button:has-text('Create')", {
      timeout: 15000,
    });

    await this.page.waitForTimeout(500);
  }

  async fillAndCreate() {
    console.log("Fill Value & Create");

    await this.page.getByRole("textbox", { name: "Name" }).click();
    await this.page.getByRole("textbox", { name: "Name" }).fill("");
    await this.page
      .getByRole("textbox", { name: "Name" })
      .fill(config.CANVAS_NAME);
    console.log(`Name: ${config.CANVAS_NAME}`);

    await this.page.getByRole("textbox", { name: "Width" }).click();
    await this.page
      .getByRole("textbox", { name: "Width" })
      .fill(String(config.CANVAS_WIDTH));
    console.log(`Width: ${config.CANVAS_WIDTH}`);

    await this.page.getByRole("textbox", { name: "Height" }).click();
    await this.page
      .getByRole("textbox", { name: "Height" })
      .fill(String(config.CANVAS_HEIGHT));
    console.log(`Height: ${config.CANVAS_HEIGHT}`);

    await this.page.getByRole("textbox", { name: "DPI" }).click();
    await this.page
      .getByRole("textbox", { name: "DPI" })
      .fill(String(config.CANVAS_DPI));
    console.log(`DPI: ${config.CANVAS_DPI}`);

    await this.page.getByLabel("Background").selectOption("2");
    console.log("Background: Transparent");
    await this.page.locator("#dd470").selectOption("2");
    console.log("Bit depth: 32 bit");

    await this.page.getByRole("button", { name: "Create" }).click();

    await this.page.waitForTimeout(4000);
  }

  async addRedRectangle() {
    console.log("🟥 Red Rectangle bana raha hun...");

    await this.page.getByRole("button", { name: "Rectangle (U)" }).click();
    await this.page.waitForTimeout(500);

    // Right click
    await this.page
      .getByRole("button", { name: "Rectangle (U)" })
      .click({ button: "right" });
    await this.page.waitForTimeout(300);

    await this.page.getByText("RectangleU").click();
    await this.page.waitForTimeout(300);

    await this.page
      .locator("canvas")
      .nth(4)
      .click({
        position: { x: 88, y: 255 },
      });
    await this.page.waitForTimeout(500);

    await this.page.getByRole("textbox", { name: "Width:" }).click();
    await this.page.getByRole("textbox", { name: "Width:" }).fill("600");

    await this.page.getByRole("textbox", { name: "Height:" }).click();
    await this.page.getByRole("textbox", { name: "Height:" }).fill("600");

    // // OK click karo
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.page.waitForTimeout(1000);

    await this.page.locator("canvas").first().click();
    await this.page.waitForTimeout(500);

    await this.page.locator("span").nth(5).click();

    await this.page
      .getByRole("button", { name: "Move Tool (V)" })
      .click({ button: "right" });
    await this.page.getByText("Move Tool").click();
    await this.page.waitForTimeout(300);
  }
}

module.exports = { PhotopeaPage };
