const config = require("../utils/config");
const { expect } = require("@playwright/test");

class PhotopeaPage {
  constructor(page) {
    this.page = page;
  }

  // Opening Photopea website
  async open() {
    await this.page.goto("https://www.photopea.com/");

    await this.page.waitForSelector("canvas", { timeout: 30000 });

    await this.page.waitForTimeout(3000);

    try {
      await this.page.click("text=OK", { timeout: 4000 });
      console.log("✅ Popup band kiya");
    } catch (e) {
      // Popup nahi aaya — koi baat nahi, aage badho
    }

    try {
      await this.page.keyboard.press("Escape");
    } catch (e) {}

    await this.page.waitForTimeout(2000);

    console.log("✅ Photopea khul gaya");
  }

  async createDocument() {
    console.log("📄 Document bana raha hun...");

    // Yeh script Photopea ki apni language mein hai
    // (Adobe ExtendScript — Photoshop jaisi)
    const script = `
      app.documents.add(
        ${config.CANVAS_WIDTH},
        ${config.CANVAS_HEIGHT},
        ${config.CANVAS_DPI},
        '${config.CANVAS_NAME}',
        NewDocumentMode.RGB,
        DocumentFill.TRANSPARENT,
        1,
        BitsPerChannelType.THIRTYTWO
      );
    `;

    // Script ko URL mein dalo
    // JSON.stringify → script ko safe string banao
    // encodeURIComponent → URL ke liye safe banao
    const encoded = encodeURIComponent(
      JSON.stringify({
        files: [],
        script: script,
      }),
    );

    // Is URL pe jao — Photopea khulega aur script chalega
    await this.page.goto(`https://www.photopea.com/#${encoded}`);

    // Canvas aane tak ruko
    await this.page.waitForSelector("canvas", { timeout: 45000 });

    // Script execute hone do — 5 second ruko
    await this.page.waitForTimeout(5000);

    // Popup aye to band karo
    try {
      await this.page.click("text=OK", { timeout: 3000 });
    } catch (e) {}

    try {
      await this.page.keyboard.press("Escape");
      await this.page.waitForTimeout(500);
    } catch (e) {}

    console.log("✅ Document ban gaya: 1280x960, Transparent");
  }
}

module.exports = { PhotopeaPage };
