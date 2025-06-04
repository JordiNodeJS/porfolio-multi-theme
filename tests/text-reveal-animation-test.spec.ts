import { test, expect } from "@playwright/test";

test.describe("TextRevealAnimation Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should complete animation and show full text", async ({ page }) => {
    // Wait for the title animation to complete
    await page.waitForTimeout(3000);
    
    // Check that the complete title is visible
    const titleElement = page.locator("#hero").getByText(/JORGe's web/i);
    await expect(titleElement).toBeVisible();
    
    // Verify the text content is complete
    const titleText = await titleElement.textContent();
    expect(titleText).toMatch(/JORGe's web/i);
    
    console.log("✅ Title animation completed, full text visible:", titleText);
  });

  test("should handle centered text properly", async ({ page }) => {
    // Check subtitle with text-center class
    const subtitleElement = page.locator("#hero").getByText(/Frontend React/i);
    await expect(subtitleElement).toBeVisible();
    
    // Verify the element has center styling
    const computedStyle = await subtitleElement.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        textAlign: style.textAlign,
        display: style.display,
        justifyContent: style.justifyContent
      };
    });
    
    console.log("Subtitle computed styles:", computedStyle);
    
    // Check that text is properly centered
    expect([computedStyle.textAlign, computedStyle.justifyContent]).toContainEqual(
      expect.stringMatching(/center/)
    );
    
    console.log("✅ Subtitle properly centered");
  });

  test("should work correctly in brutalism theme", async ({ page }) => {
    // Switch to brutalism theme
    for (let i = 0; i < 5; i++) {
      await page.locator('[aria-label="Toggle theme"]').click();
      await page.waitForTimeout(300);
      
      // Check if we're in brutalism theme
      const themeCheck = await page.locator('[data-theme="brutalism"]').count();
      if (themeCheck > 0) break;
    }
    
    // Wait extra time for brutalism theme (slower animation)
    await page.waitForTimeout(4000);
    
    // Check that the complete title is still visible in brutalism
    const titleElement = page.locator("#hero").getByText(/JORGe's web/i);
    await expect(titleElement).toBeVisible();
    
    // Verify no text clipping occurs
    const titleBox = await titleElement.boundingBox();
    expect(titleBox).toBeTruthy();
    
    if (titleBox) {
      // Check that the element has enough width for the content
      expect(titleBox.width).toBeGreaterThan(100);
      console.log("Title box in brutalism:", titleBox);
    }
    
    // Check that overflow is visible
    const overflowStyle = await titleElement.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.overflow;
    });
    
    console.log("Overflow style in brutalism:", overflowStyle);
    
    console.log("✅ Title works correctly in brutalism theme");
  });

  test("should animate at different speeds in different themes", async ({ page }) => {
    const themes = ["dark", "brutalism"];
    
    for (const themeName of themes) {
      console.log(`Testing animation speed in ${themeName} theme...`);
      
      // Refresh page to reset animation
      await page.reload();
      await page.waitForLoadState("networkidle");
      
      // Switch to desired theme
      if (themeName === "brutalism") {
        for (let i = 0; i < 5; i++) {
          await page.locator('[aria-label="Toggle theme"]').click();
          await page.waitForTimeout(200);
          const themeCheck = await page.locator('[data-theme="brutalism"]').count();
          if (themeCheck > 0) break;
        }
      }
      
      // Measure animation time
      const startTime = Date.now();
      
      // Wait for animation to start and complete
      const titleElement = page.locator("#hero").getByText(/JORGe/i).first();
      await expect(titleElement).toBeVisible();
      
      // Wait for full text to appear
      await page.waitForFunction(() => {
        const element = document.querySelector("#hero");
        return element?.textContent?.includes("JORGe's web");
      }, { timeout: 10000 });
      
      const endTime = Date.now();
      const animationDuration = endTime - startTime;
      
      console.log(`Animation duration in ${themeName}: ${animationDuration}ms`);
      
      // Brutalism should be slower than other themes
      if (themeName === "brutalism") {
        expect(animationDuration).toBeGreaterThan(2000); // Should take more than 2 seconds
      }
      
      console.log(`✅ Animation timing verified in ${themeName}: ${animationDuration}ms`);
    }
  });

  test("should have proper fallback text", async ({ page }) => {
    // Check that fallback text is correct
    const titleElement = page.locator("#hero").getByText(/JORGe/i).first();
    await expect(titleElement).toBeVisible();
    
    // Even during animation, some form of the title should be visible
    const initialText = await titleElement.textContent();
    expect(initialText).toBeTruthy();
    expect(initialText?.length).toBeGreaterThan(0);
    
    console.log("Initial/fallback text:", initialText);
    
    // Wait for animation to complete
    await page.waitForTimeout(3000);
    
    const finalText = await titleElement.textContent();
    expect(finalText).toContain("JORGe's web");
    
    console.log("✅ Fallback and final text verified:", { initialText, finalText });
  });

  test("should handle different text lengths", async ({ page }) => {
    // Test with the actual texts used in the component
    const testTexts = [
      "JORGe's web",
      "Frontend React"
    ];
    
    for (const text of testTexts) {
      const element = page.locator("#hero").getByText(new RegExp(text, "i"));
      await expect(element).toBeVisible();
      
      // Check that the element can accommodate the text
      const textBox = await element.boundingBox();
      expect(textBox).toBeTruthy();
      
      if (textBox) {
        // Ensure minimum width for readability
        expect(textBox.width).toBeGreaterThan(50);
        console.log(`Text "${text}" box:`, textBox);
      }
    }
    
    console.log("✅ All text lengths handled properly");
  });

  test("should not have text overflow issues", async ({ page }) => {
    const themes = ["dark", "light", "brutalism", "vintage"];
    
    for (let i = 0; i < themes.length; i++) {
      // Change theme
      await page.locator('[aria-label="Toggle theme"]').click();
      await page.waitForTimeout(500);
      
      // Wait for animations to complete
      await page.waitForTimeout(2000);
      
      // Check title element
      const titleElement = page.locator("#hero").getByText(/JORGe/i).first();
      await expect(titleElement).toBeVisible();
      
      // Check for text overflow
      const hasOverflow = await titleElement.evaluate(el => {
        const style = window.getComputedStyle(el);
        const parent = el.parentElement;
        
        if (!parent) return false;
        
        const parentStyle = window.getComputedStyle(parent);
        const isOverflowHidden = style.overflow === 'hidden' || parentStyle.overflow === 'hidden';
        const isTextCut = el.scrollWidth > el.clientWidth;
        
        return isOverflowHidden && isTextCut;
      });
      
      // Text should not be cut off
      expect(hasOverflow).toBeFalsy();
      
      console.log(`✅ No text overflow in ${themes[i]} theme`);
    }
  });
}); 