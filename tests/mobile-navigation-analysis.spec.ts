import { test, expect } from "@playwright/test";

test.describe("Mobile Navigation Analysis", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  });

  test("debug mobile navigation step by step", async ({ page }) => {
    console.log("🔍 Starting mobile navigation debug...");

    // Wait for page to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // Take initial screenshot
    await page.screenshot({ path: "debug-initial.png" });

    // Check if hamburger menu button exists and is visible
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    const hamburgerExists = await hamburgerButton.count();
    console.log(`🍔 Hamburger button exists: ${hamburgerExists > 0}`);

    if (hamburgerExists > 0) {
      const isVisible = await hamburgerButton.isVisible();
      console.log(`🍔 Hamburger button visible: ${isVisible}`);

      if (isVisible) {
        // Click hamburger button
        console.log("🍔 Clicking hamburger button...");
        await hamburgerButton.click();
        await page.waitForTimeout(1000);

        // Take screenshot after clicking
        await page.screenshot({ path: "debug-after-hamburger-click.png" });

        // Check if mobile menu is open
        const mobileMenu = page.locator("nav").locator("div").last();
        const menuVisible = await mobileMenu.isVisible();
        console.log(`📱 Mobile menu visible: ${menuVisible}`);

        // Look for all buttons with "Experiencia" text
        const experienciaButtons = await page
          .locator("button")
          .filter({ hasText: "Experiencia" })
          .all();
        console.log(
          `🎯 Found ${experienciaButtons.length} buttons with 'Experiencia' text`
        );

        for (let i = 0; i < experienciaButtons.length; i++) {
          const button = experienciaButtons[i];
          const isVisible = await button.isVisible();
          const isEnabled = await button.isEnabled();
          const boundingBox = await button.boundingBox();

          console.log(
            `Button ${i}: visible=${isVisible}, enabled=${isEnabled}, boundingBox=${JSON.stringify(
              boundingBox
            )}`
          );

          if (isVisible && boundingBox) {
            console.log(
              `✅ Button ${i} is clickable at position (${boundingBox.x}, ${boundingBox.y})`
            );

            // Try to click this button
            try {
              await button.click({ timeout: 5000 });
              console.log(`✅ Successfully clicked button ${i}`);
              break;
            } catch (error) {
              console.log(`❌ Failed to click button ${i}: ${error.message}`);
            }
          }
        }

        // If no Experiencia button found, check what buttons are available
        if (experienciaButtons.length === 0) {
          console.log(
            "🔍 No Experiencia buttons found. Looking for all visible buttons..."
          );
          const allButtons = await page.locator("button").all();

          for (let i = 0; i < allButtons.length; i++) {
            const button = allButtons[i];
            const isVisible = await button.isVisible();
            if (isVisible) {
              const text = await button.textContent();
              const boundingBox = await button.boundingBox();
              console.log(
                `Visible button ${i}: text="${text}", boundingBox=${JSON.stringify(
                  boundingBox
                )}`
              );
            }
          }
        }
      }
    }

    // Check current page language
    const htmlLang = await page.getAttribute("html", "lang");
    console.log(`🌐 Page language: ${htmlLang}`);

    // Check if there are any navigation items with different text
    const navButtons = await page.locator("nav button").all();
    console.log(`🧭 Total nav buttons found: ${navButtons.length}`);

    for (let i = 0; i < navButtons.length; i++) {
      const button = navButtons[i];
      const text = await button.textContent();
      const isVisible = await button.isVisible();
      console.log(`Nav button ${i}: text="${text}", visible=${isVisible}`);
    }
  });

  test("check z-index and positioning issues", async ({ page }) => {
    console.log("🔍 Checking z-index and positioning...");

    await page.waitForLoadState("networkidle");

    // Get navigation element
    const nav = page.locator("nav").first();
    const navStyles = await nav.evaluate((el) => {
      const styles = getComputedStyle(el);
      return {
        position: styles.position,
        zIndex: styles.zIndex,
        top: styles.top,
        left: styles.left,
        right: styles.right,
        bottom: styles.bottom,
        width: styles.width,
        height: styles.height,
        pointerEvents: styles.pointerEvents,
      };
    });

    console.log("🧭 Navigation styles:", navStyles);

    // Check if navigation is covering the content area
    const navBox = await nav.boundingBox();
    console.log("📏 Navigation bounding box:", navBox);

    // Simulate scroll to Experience section
    await page.evaluate(() => {
      const experienceSection = document.querySelector("#experience");
      if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    await page.waitForTimeout(2000);

    // Check if experience cards exist
    const experienceCards = await page.locator(".glass-effect").all();
    console.log(`💼 Found ${experienceCards.length} experience cards`);

    if (experienceCards.length > 0) {
      const firstCard = experienceCards[0];
      const cardBox = await firstCard.boundingBox();
      console.log("📋 First card bounding box:", cardBox);

      // Check for overlap with navigation
      if (navBox && cardBox) {
        const overlap =
          navBox.x < cardBox.x + cardBox.width &&
          navBox.x + navBox.width > cardBox.x &&
          navBox.y < cardBox.y + cardBox.height &&
          navBox.y + navBox.height > cardBox.y;
        console.log(`🚨 Navigation overlaps with cards: ${overlap}`);
      }
    }
  });
});
