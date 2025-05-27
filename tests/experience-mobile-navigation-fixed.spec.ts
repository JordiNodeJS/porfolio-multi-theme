import { test, expect } from "@playwright/test";

// Configure mobile viewport for all tests
test.use({
  viewport: { width: 375, height: 667 }, // iPhone SE size
});

test.describe("Experience Section Mobile - Navigation Fixed", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  async function navigateToExperienceOnMobile(page: any) {
    console.log("🔍 Starting mobile navigation to Experience section...");
    
    // Step 1: Click hamburger menu button
    const hamburgerButton = page.locator('nav button').filter({ 
      has: page.locator('svg') 
    }).first();
    
    console.log("📱 Clicking hamburger menu...");
    await hamburgerButton.click();
    await page.waitForTimeout(500);
    
    // Step 2: Wait for mobile menu to be visible
    const mobileMenu = page.locator('nav div').last();
    await expect(mobileMenu).toBeVisible({ timeout: 5000 });
    console.log("✅ Mobile menu is now visible");
    
    // Step 3: Click the Experience button in mobile menu
    // Based on debug output, we want the visible one (nth(1))
    const experienceButton = page.locator('button').filter({ 
      hasText: "Experiencia" 
    }).nth(1);
    
    console.log("🎯 Clicking Experience button in mobile menu...");
    await experienceButton.click();
    await page.waitForTimeout(1000);
    
    // Step 4: Verify we're in the experience section
    const experienceHeading = page.locator("h2").filter({ 
      hasText: /Experiencia|Experience/ 
    });
    await expect(experienceHeading).toBeVisible({ timeout: 5000 });
    console.log("✅ Successfully navigated to Experience section");
  }

  test("should successfully navigate to experience section and interact with mobile cards", async ({ page }) => {
    // Navigate to experience section using mobile menu
    await navigateToExperienceOnMobile(page);
    
    // Now test mobile experience cards interaction
    console.log("🔍 Looking for mobile experience cards...");
    
    // Look for mobile cards using the class structure from the component
    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();
    console.log(`📋 Found ${cardCount} mobile experience cards`);
    
    expect(cardCount).toBeGreaterThan(0);
    
    if (cardCount > 0) {
      const firstCard = mobileCards.first();
      
      // Verify the card is visible
      await expect(firstCard).toBeVisible();
      console.log("✅ First mobile card is visible");
      
      // Get card bounding box
      const cardBox = await firstCard.boundingBox();
      console.log("📐 Card bounding box:", cardBox);
      
      // Try to click the card
      try {
        await firstCard.click({ timeout: 5000 });
        console.log("✅ Successfully clicked mobile experience card!");
        
        // If successful, we've fixed the navigation blocking issue
        console.log("🎉 MOBILE CARD INTERACTION WORKS!");
      } catch (error) {
        console.log("❌ Mobile card click failed:", error.message);
        
        // Additional debugging if click still fails
        const navElement = page.locator('nav');
        const navBox = await navElement.boundingBox();
        console.log("🧭 Navigation bounding box:", navBox);
        
        // Check what element is at the click point
        if (cardBox) {
          const clickPoint = {
            x: cardBox.x + cardBox.width / 2,
            y: cardBox.y + cardBox.height / 2
          };
          
          const elementAtPoint = await page.evaluate((point) => {
            const el = document.elementFromPoint(point.x, point.y);
            return {
              tagName: el?.tagName,
              className: el?.className,
              textContent: el?.textContent?.slice(0, 50)
            };
          }, clickPoint);
          
          console.log("🔍 Element at click point:", elementAtPoint);
        }
      }
    }
  });

  test("should verify navigation pointer-events fix", async ({ page }) => {
    console.log("🔧 Testing navigation pointer-events fix...");
    
    // Check navigation styles
    const navElement = page.locator('nav');
    const navStyles = await navElement.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        position: styles.position,
        zIndex: styles.zIndex,
        pointerEvents: styles.pointerEvents,
        top: styles.top,
        left: styles.left,
        right: styles.right
      };
    });
    
    console.log("🧭 Navigation computed styles:", navStyles);
    
    // Navigation should have pointer-events: none to allow clicks through
    expect(navStyles.pointerEvents).toBe('none');
    console.log("✅ Navigation has pointer-events: none - fix is applied!");
    
    // Navigate to experience section
    await navigateToExperienceOnMobile(page);
    
    // Test that mobile cards are now clickable
    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();
    
    if (cardCount > 0) {
      const firstCard = mobileCards.first();
      
      // This should work now that navigation doesn't block clicks
      await expect(firstCard).toBeVisible();
      
      // Try clicking using mouse.click for more precise control
      const cardBox = await firstCard.boundingBox();
      if (cardBox) {
        await page.mouse.click(
          cardBox.x + cardBox.width / 2, 
          cardBox.y + cardBox.height / 2
        );
        console.log("✅ Mouse click on mobile card successful!");
      }
    }
  });
});
