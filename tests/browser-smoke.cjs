const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const baseUrl = process.env.SITE_BASE_URL || "http://127.0.0.1:4173";
const outputDir = path.join(__dirname, "..", ".codex_work", "screenshots");
const pages = [
  "index.html",
  "agenda.html",
  "checkin.html",
  "seating.html",
  "live.html",
  "feedback.html",
  "transport.html",
  "404.html"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function revealFullPage(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(300, window.innerHeight * 0.7)) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.BROWSER_EXECUTABLE || undefined
  });
  const errors = [];

  try {
    for (const viewport of [
      { name: "mobile", width: 375, height: 812 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1440, height: 1000 }
    ]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(`${viewport.name}: console: ${message.text()}`);
      });
      page.on("pageerror", (error) => errors.push(`${viewport.name}: pageerror: ${error.message}`));

      for (const file of pages) {
        const response = await page.goto(`${baseUrl}/${file}`, { waitUntil: "networkidle" });
        assert(response && response.ok(), `${viewport.name}/${file}: HTTP response failed`);
        assert(await page.locator("main#main-content").count() === 1, `${viewport.name}/${file}: main landmark missing`);
        assert((await page.locator("h1").first().textContent() || "").trim(), `${viewport.name}/${file}: h1 missing`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert(overflow <= 1, `${viewport.name}/${file}: horizontal overflow ${overflow}px`);
        const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
        assert(brokenImages.length === 0, `${viewport.name}/${file}: broken images ${brokenImages.join(", ")}`);
      }

      await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
      if (viewport.name === "mobile") {
        const toggle = page.locator(".nav-toggle");
        await toggle.click();
        assert(await toggle.getAttribute("aria-expanded") === "true", "mobile: menu did not open");
        assert(await page.locator("#primary-nav").evaluate((element) => getComputedStyle(element).display) === "grid", "mobile: menu not visible");
      }

      const undersized = await page.locator("a, button").evaluateAll((elements) => elements
        .filter((element) => {
          const style = getComputedStyle(element);
          const box = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0;
        })
        .filter((element) => {
          const box = element.getBoundingClientRect();
          return box.width < 44 || box.height < 44;
        })
        .map((element) => `${element.tagName}:${element.textContent.trim().slice(0, 30)}`));
      assert(undersized.length === 0, `${viewport.name}: undersized targets ${undersized.join(", ")}`);

      await page.goto(`${baseUrl}/seating.html`, { waitUntil: "networkidle" });
      const frontTab = page.locator("#seat-tab-front");
      const backTab = page.locator("#seat-tab-back");
      await frontTab.focus();
      await frontTab.press("ArrowRight");
      assert(await backTab.getAttribute("aria-selected") === "true", `${viewport.name}: seating keyboard switch failed`);
      assert(await page.locator("#seat-back").isVisible(), `${viewport.name}: back seating panel not visible`);

      if (viewport.name === "mobile" || viewport.name === "desktop") {
        await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
        await revealFullPage(page);
        await page.screenshot({ path: path.join(outputDir, `home-${viewport.name}.png`), fullPage: true });
        await page.goto(`${baseUrl}/seating.html`, { waitUntil: "networkidle" });
        await revealFullPage(page);
        await page.screenshot({ path: path.join(outputDir, `seating-${viewport.name}.png`), fullPage: true });
      }
      await context.close();
    }

    const reducedContext = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
    const hiddenReveal = await reducedPage.locator(".reveal").evaluateAll((items) => items.filter((item) => getComputedStyle(item).opacity !== "1").length);
    assert(hiddenReveal === 0, "reduced motion: reveal content remained hidden");
    await reducedContext.close();

    assert(errors.length === 0, errors.join("\n"));
    console.log(`PASS: ${pages.length} pages × 3 viewports, navigation, keyboard tabs, touch targets, reduced motion`);
    console.log(`Screenshots: ${outputDir}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(`FAIL: ${error.stack || error.message}`);
  process.exit(1);
});
