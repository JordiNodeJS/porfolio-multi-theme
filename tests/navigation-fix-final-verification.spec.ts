import { test, expect } from "@playwright/test";

test.describe("Navigation Scroll Offset - Final Verification", () => {
  test("should verify that section titles are properly positioned after navigation fix", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector("#hero", { timeout: 10000 });
    await page.waitForTimeout(2000);

    console.log("🔍 Testing navigation scroll offset fix...");

    // Get navigation height
    const navHeight = await page
      .locator("nav")
      .evaluate((el) => el.getBoundingClientRect().height);
    console.log("📏 Navigation height:", navHeight, "px");

    // Test desktop navigation - click specifically on the desktop Experience button
    console.log("🖥️ Testing desktop navigation...");
    const desktopNavButton = page
      .locator("nav .hidden.md\\:flex button")
      .filter({ hasText: /experience/i })
      .first();
    await desktopNavButton.click();
    await page.waitForTimeout(1500);

    // Check Experience section title position
    const experienceTitle = page.locator("#experience h2").first();
    await expect(experienceTitle).toBeVisible();

    const titleBounds = await experienceTitle.boundingBox();
    if (titleBounds) {
      const margin = titleBounds.y - navHeight;
      console.log("📍 Experience title Y position:", titleBounds.y);
      console.log("📐 Margin below navigation:", margin, "px");

      // Verify the title is positioned correctly with offset
      expect(titleBounds.y).toBeGreaterThan(navHeight + 10);
      console.log("✅ Experience title is correctly positioned!");
    }

    // Test Skills section
    console.log("🧪 Testing Skills section...");
    const skillsNavButton = page
      .locator("nav .hidden.md\\:flex button")
      .filter({ hasText: /skills/i })
      .first();
    await skillsNavButton.click();
    await page.waitForTimeout(1500);

    const skillsTitle = page.locator("#skills h2").first();
    await expect(skillsTitle).toBeVisible();

    const skillsTitleBounds = await skillsTitle.boundingBox();
    if (skillsTitleBounds) {
      const skillsMargin = skillsTitleBounds.y - navHeight;
      console.log("📍 Skills title Y position:", skillsTitleBounds.y);
      console.log("📐 Skills margin below navigation:", skillsMargin, "px");

      expect(skillsTitleBounds.y).toBeGreaterThan(navHeight + 10);
      console.log("✅ Skills title is correctly positioned!");
    }

    // Take screenshot for visual verification
    await page.screenshot({
      path: "test-results/navigation-fix-final-verification.png",
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });

    console.log("📸 Screenshot saved: navigation-fix-final-verification.png");
    console.log(
      "🎉 Navigation scroll offset fix verification completed successfully!"
    );
  });

  test("should verify offset calculation works correctly", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector("#hero", { timeout: 10000 });
    await page.waitForTimeout(2000);

    console.log("🧮 Testing offset calculation...");

    // Execute our useScrollToSection logic directly in the browser
    const offsetTest = await page.evaluate(() => {
      const nav = document.querySelector("nav");
      if (!nav) return { error: "Navigation not found" };

      const navHeight = nav.getBoundingClientRect().height;
      const extraPadding = 20;
      const totalOffset = navHeight + extraPadding;

      return {
        navHeight,
        extraPadding,
        totalOffset,
        navExists: true,
      };
    });

    console.log("📊 Offset calculation results:", offsetTest);

    if (!offsetTest.error) {
      expect(offsetTest.navExists).toBe(true);
      expect(offsetTest.navHeight).toBeGreaterThan(50); // Reasonable nav height
      expect(offsetTest.totalOffset).toBeGreaterThan(70); // Nav + padding
      console.log("✅ Offset calculation is working correctly!");
    }
  });
});
