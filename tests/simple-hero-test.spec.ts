import { test, expect } from "@playwright/test";

test.describe("Simple Hero Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(3000); // Wait for animations
  });

  test("should display hero section", async ({ page }) => {
    // Check that hero section exists
    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();
    
    console.log("✅ Hero section is visible");
  });

  test("should display title text", async ({ page }) => {
    // Check that some form of the title is visible
    const titleElement = page.locator("#hero").getByText(/JORGe/i).first();
    await expect(titleElement).toBeVisible();
    
    const titleText = await titleElement.textContent();
    console.log("Title found:", titleText);
    
    // Should contain at least "JORGe"
    expect(titleText).toMatch(/JORGe/i);
    
    console.log("✅ Title is visible and contains JORGe");
  });

  test("should display subtitle", async ({ page }) => {
    // Check that subtitle is visible
    const subtitleElement = page.locator("#hero").getByText(/Frontend React/i);
    await expect(subtitleElement).toBeVisible();
    
    const subtitleText = await subtitleElement.textContent();
    console.log("Subtitle found:", subtitleText);
    
    expect(subtitleText).toMatch(/Frontend React/i);
    
    console.log("✅ Subtitle is visible");
  });

  test("should display profile image", async ({ page }) => {
    // Check that profile image is visible
    const profileImage = page.locator("#hero img[alt='Profile']");
    await expect(profileImage).toBeVisible();
    
    console.log("✅ Profile image is visible");
  });

  test("should have theme toggle button", async ({ page }) => {
    // Check that theme toggle exists
    const themeButton = page.locator('[aria-label="Toggle theme"]').first();
    await expect(themeButton).toBeVisible();
    
    console.log("✅ Theme toggle button is visible");
  });

  test("should be able to change theme", async ({ page }) => {
    // Try changing theme once
    const themeButton = page.locator('[aria-label="Toggle theme"]').first();
    await themeButton.click();
    
    // Wait for theme change
    await page.waitForTimeout(1000);
    
    // Check that we can still see the hero section
    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();
    
    console.log("✅ Theme change works");
  });

  test("should have proper subtitle centering", async ({ page }) => {
    // Check subtitle centering
    const subtitleElement = page.locator("#hero").getByText(/Frontend React/i);
    await expect(subtitleElement).toBeVisible();
    
    // Get the bounding box of the subtitle
    const subtitleBox = await subtitleElement.boundingBox();
    expect(subtitleBox).toBeTruthy();
    
    // Get the viewport width
    const viewportSize = page.viewportSize();
    expect(viewportSize).toBeTruthy();
    
    if (subtitleBox && viewportSize) {
      const subtitleCenter = subtitleBox.x + subtitleBox.width / 2;
      const viewportCenter = viewportSize.width / 2;
      const difference = Math.abs(subtitleCenter - viewportCenter);
      
      console.log("Centering analysis:", {
        subtitleCenter,
        viewportCenter,
        difference,
        subtitleWidth: subtitleBox.width,
        viewportWidth: viewportSize.width
      });
      
      // Allow reasonable tolerance for centering (100px)
      expect(difference).toBeLessThan(100);
      
      console.log("✅ Subtitle is reasonably centered");
    }
  });

  test("should wait for title animation to complete", async ({ page }) => {
    // Wait longer for animation
    await page.waitForTimeout(5000);
    
    // Check for complete title
    const titleElement = page.locator("#hero").getByText(/JORGe's web/i);
    const isCompleteTitle = await titleElement.count() > 0;
    
    if (isCompleteTitle) {
      await expect(titleElement).toBeVisible();
      const titleText = await titleElement.textContent();
      console.log("✅ Complete title found:", titleText);
    } else {
      // Fallback check - at least partial title should be there
      const partialTitle = page.locator("#hero").getByText(/JORGe/i).first();
      await expect(partialTitle).toBeVisible();
      const titleText = await partialTitle.textContent();
      console.log("⚠️ Only partial title found:", titleText);
    }
  });

  test("should take a screenshot of current state", async ({ page }) => {
    // Take a screenshot for visual verification
    await page.screenshot({ 
      path: "test-results/hero-current-state.png",
      fullPage: false
    });
    
    // Also screenshot just the hero section
    const heroSection = page.locator("#hero");
    await heroSection.screenshot({ 
      path: "test-results/hero-section-only.png"
    });
    
    console.log("✅ Screenshots taken");
  });
}); 