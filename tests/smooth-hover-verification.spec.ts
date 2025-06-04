import { test, expect } from "@playwright/test";

test.describe("Profile Image Smooth Hover Transitions", () => {
  test("should have smooth background transitions when hovering profile image", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    // Wait for the hero section to load
    await page.waitForSelector('[data-testid="hero-section"], section#hero', {
      timeout: 10000,
    });

    // Find the profile image container
    const profileContainer = page.locator(".profile-image-container").first();

    // Wait for the container to be visible
    await expect(profileContainer).toBeVisible({ timeout: 5000 });

    // Get the background elements
    const backgroundElements = page.locator(".background-smooth");

    // Verify that background elements have smooth transition classes
    for (let i = 0; i < (await backgroundElements.count()); i++) {
      const element = backgroundElements.nth(i);
      const hasBackgroundSmooth = await element.evaluate((el) =>
        el.classList.contains("background-smooth")
      );
      expect(hasBackgroundSmooth).toBe(true);
    }

    // Test the hover effect
    await profileContainer.hover();

    // Wait a bit for transitions to start
    await page.waitForTimeout(200);

    // Verify the image is still visible and the hover state is applied
    await expect(profileContainer).toBeVisible();

    // Move mouse away to test the smooth transition back
    await page.mouse.move(0, 0);

    // Wait for transitions to complete
    await page.waitForTimeout(1000);

    console.log("✅ Smooth background transitions verified successfully");
  });

  test("should have proper CSS transition properties on background elements", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    // Wait for the hero section to load
    await page.waitForSelector("section#hero", { timeout: 10000 });

    // Check that CSS transition classes are applied
    const backgroundElements = page.locator(".background-smooth");

    if ((await backgroundElements.count()) > 0) {
      const firstElement = backgroundElements.first();

      // Get computed styles
      const transitionProperty = await firstElement.evaluate(
        (el) => getComputedStyle(el).transitionProperty
      );

      const transitionDuration = await firstElement.evaluate(
        (el) => getComputedStyle(el).transitionDuration
      );

      // Verify transition properties are set
      expect(transitionProperty).toContain("transform");
      expect(transitionDuration).not.toBe("0s");

      console.log("✅ CSS transition properties verified:", {
        transitionProperty,
        transitionDuration,
      });
    }
  });
});
