const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

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
        const response = await page.goto(`${baseUrl}/${file}`, { waitUntil: "domcontentloaded" });
        assert(response && response.ok(), `${viewport.name}/${file}: HTTP response failed`);
        assert(await page.locator("main#main-content").count() === 1, `${viewport.name}/${file}: main landmark missing`);
        assert((await page.locator("h1").first().textContent() || "").trim(), `${viewport.name}/${file}: h1 missing`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert(overflow <= 1, `${viewport.name}/${file}: horizontal overflow ${overflow}px`);
        const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
        assert(brokenImages.length === 0, `${viewport.name}/${file}: broken images ${brokenImages.join(", ")}`);
        if (file === "agenda.html") {
          await page.waitForFunction(() => document.querySelector("#agenda-list")?.getAttribute("aria-busy") === "false");
          assert(await page.locator(".agenda-item").count() === 18, `${viewport.name}: Excel agenda did not render 18 rows`);
          assert((await page.locator("#agenda-status").textContent() || "").includes("已讀取 Excel"), `${viewport.name}: Excel agenda status is incorrect`);
        }
      }

      await page.goto(`${baseUrl}/index.html`, { waitUntil: "domcontentloaded" });
      assert(await page.locator(".site-header").evaluate((element) => getComputedStyle(element).position) === "fixed", `${viewport.name}: header is not fixed`);
      assert(await page.locator(".event-meta dd").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize)) >= 28, `${viewport.name}: event details are smaller than 28px`);
      assert(await page.locator(".dm-frame img").count() === 1, `${viewport.name}: event EDM is missing`);
      assert((await page.locator("#event-dm h2").textContent() || "").trim() === "活動 DM", `${viewport.name}: event DM heading is incorrect`);
      assert(await page.locator("#event-dm .section-heading > p").count() === 0, `${viewport.name}: event DM explanatory copy should be removed`);
      if (viewport.name === "mobile") {
        const toggle = page.locator(".nav-toggle");
        await toggle.click();
        assert(await toggle.getAttribute("aria-expanded") === "true", "mobile: menu did not open");
        assert(await page.locator("#primary-nav").evaluate((element) => getComputedStyle(element).display) === "grid", "mobile: menu not visible");
        await toggle.click();
        assert(await page.locator(".mobile-section-dots button").count() === 3, "mobile: section indicator count is incorrect");
        assert(await page.locator(".mobile-section-rail").isVisible(), "mobile: section indicator is not visible");
        await page.evaluate(() => window.scrollTo(0, 180));
        await page.waitForTimeout(80);
        assert(await page.locator(".mobile-scroll-status").evaluate((element) => element.classList.contains("is-visible")), "mobile: scroll status did not appear");
        await page.waitForTimeout(1900);
        assert(!await page.locator(".mobile-scroll-status").evaluate((element) => element.classList.contains("is-visible")), "mobile: scroll status did not hide after one second of inactivity");
      } else {
        assert(await page.locator(".mobile-section-rail").evaluate((element) => getComputedStyle(element).display) === "none", `${viewport.name}: mobile indicator should be hidden`);
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

      await page.goto(`${baseUrl}/seating.html`, { waitUntil: "domcontentloaded" });
      const frontTab = page.locator("#seat-tab-front");
      const backTab = page.locator("#seat-tab-back");
      assert(await backTab.getAttribute("aria-selected") === "true", `${viewport.name}: provided back seating view is not the default`);
      assert(await page.locator("#seat-back img").count() === 1, `${viewport.name}: back seating image is missing`);
      await frontTab.focus();
      await frontTab.press("ArrowRight");
      assert(await backTab.getAttribute("aria-selected") === "true", `${viewport.name}: seating keyboard switch failed`);
      assert(await page.locator("#seat-back").isVisible(), `${viewport.name}: back seating panel not visible`);

      await page.goto(`${baseUrl}/index.html`, { waitUntil: "domcontentloaded" });
      const snapTarget = await page.locator("#event-guide").evaluate((element) => element.getBoundingClientRect().top + window.scrollY - document.querySelector(".site-header").offsetHeight);
      const heroHeight = await page.locator("#home-intro").evaluate((element) => element.offsetHeight);
      await page.evaluate((distance) => window.scrollTo(0, distance), heroHeight * 0.4);
      await page.waitForTimeout(1200);
      const snappedY = await page.evaluate(() => window.scrollY);
      assert(Math.abs(snappedY - snapTarget) <= 12, `${viewport.name}: 35% section settling failed (${snappedY} vs ${snapTarget})`);

      if (viewport.name === "mobile" || viewport.name === "desktop") {
        await page.goto(`${baseUrl}/index.html`, { waitUntil: "domcontentloaded" });
        await page.screenshot({ path: path.join(outputDir, `home-${viewport.name}.png`), fullPage: true });
        await page.locator(".event-meta").screenshot({ path: path.join(outputDir, `home-event-details-${viewport.name}.png`) });
        await page.goto(`${baseUrl}/agenda.html`, { waitUntil: "domcontentloaded" });
        await page.waitForFunction(() => document.querySelector("#agenda-list")?.getAttribute("aria-busy") === "false");
        await page.screenshot({ path: path.join(outputDir, `agenda-${viewport.name}.png`), fullPage: true });
        await page.goto(`${baseUrl}/seating.html`, { waitUntil: "domcontentloaded" });
        await page.screenshot({ path: path.join(outputDir, `seating-${viewport.name}.png`), fullPage: true });
        await page.goto(`${baseUrl}/transport.html`, { waitUntil: "domcontentloaded" });
        await page.screenshot({ path: path.join(outputDir, `transport-${viewport.name}.png`), fullPage: true });
      }
      await context.close();
    }

    const reducedContext = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(`${baseUrl}/index.html`, { waitUntil: "domcontentloaded" });
    const hiddenReveal = await reducedPage.locator(".reveal").evaluateAll((items) => items.filter((item) => getComputedStyle(item).opacity !== "1").length);
    assert(hiddenReveal === 0, "reduced motion: reveal content remained hidden");
    await reducedContext.close();

    const fileContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const filePage = await fileContext.newPage();
    await filePage.goto(pathToFileURL(path.join(__dirname, "..", "agenda.html")).href, { waitUntil: "domcontentloaded" });
    assert(await filePage.locator(".agenda-item").count() === 18, "file preview: synchronized agenda fallback did not render 18 rows");
    assert((await filePage.locator("#agenda-status").textContent() || "").includes("本機直接預覽"), "file preview: local preview status is incorrect");
    await fileContext.close();

    assert(errors.length === 0, errors.join("\n"));
    console.log(`PASS: ${pages.length} pages × 3 viewports, HTTP Excel agenda, direct-file fallback, event assets, navigation, keyboard tabs, touch targets, reduced motion`);
    console.log(`Screenshots: ${outputDir}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(`FAIL: ${error.stack || error.message}`);
  process.exit(1);
});
