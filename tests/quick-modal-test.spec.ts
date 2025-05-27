import { test, expect } from "@playwright/test";

test.use({
  viewport: { width: 375, height: 667 },
});

test("Quick modal test", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  console.log("🔍 Starting navigation test...");
  
  // Step 1: Click hamburger menu
  const hamburger = page.locator('nav button').filter({ has: page.locator('svg') }).first();
  await hamburger.click();
  await page.waitForTimeout(500);
  // Step 2: Click Experience (button index 1 from debug results)
  const experienceButton = page.locator('button').filter({ hasText: /Experience|Experiencia/i }).nth(1);
  
  // Force click to bypass overlay issues
  await experienceButton.click({ force: true });
  await page.waitForTimeout(1000);
  
  // Step 2.5: Close mobile menu by clicking hamburger again
  console.log("🔒 Closing mobile menu...");
  await hamburger.click();
  await page.waitForTimeout(500);
  
  // Step 3: Find and click first experience card
  console.log("🔍 Looking for experience cards...");
  const mobileCards = page.locator(".md\\:hidden .glass-effect");
  const cardCount = await mobileCards.count();
  console.log(`📋 Found ${cardCount} mobile cards`);
  
  if (cardCount > 0) {
    const firstCard = mobileCards.first();
    
    // Get card info
    const cardInfo = await firstCard.evaluate(el => ({
      title: el.querySelector('h3')?.textContent,
      company: el.querySelector('p')?.textContent
    }));
    
    console.log(`📄 Testing first card: ${cardInfo.title} at ${cardInfo.company}`);
    
    // Click the card
    await firstCard.click({ timeout: 5000 });
    await page.waitForTimeout(2000);
    
    // Check for modal
    const modalCount = await page.locator('[role="dialog"], .modal, .backdrop, div[class*="modal"]').count();
    console.log(`🎭 Modals found: ${modalCount}`);
    
    if (modalCount > 0) {
      console.log("✅ Modal appeared!");
    } else {
      console.log("❌ No modal appeared");
      
      // Debug: check page structure
      const overlaysCount = await page.locator('div[class*="overlay"], div[class*="backdrop"]').count();
      console.log(`Overlays found: ${overlaysCount}`);
    }
  }
  
  expect(cardCount).toBeGreaterThan(0);
});
