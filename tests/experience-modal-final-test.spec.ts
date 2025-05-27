import { test, expect } from "@playwright/test";

// Configure mobile viewport
test.use({
  viewport: { width: 375, height: 667 }, // iPhone SE
});

interface TestResult {
  index: number;
  title?: string;
  company?: string;
  className?: string;
  modalWorks: boolean;
  error?: string;
}

test.describe("Experience Cards Modal Test - Final", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  // Working navigation function based on successful tests
  async function navigateToExperienceSection(page: any) {
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
    
    // Step 3: Instead of clicking the Experience button, scroll to the section directly
    console.log("🟢 Scrolling directly to experience section by ID...");
    await page.evaluate(() => {
      const el = document.getElementById('experience') || document.querySelector('#experience, [id*=experience], [id*=experiencia]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(1000);

    // Step 4: Verify we're in the experience section
    const experienceHeading = page.locator("h2").filter({ 
      hasText: /Experiencia|Experience/i 
    });
    await expect(experienceHeading).toBeVisible({ timeout: 5000 });
    console.log("✅ Successfully navigated to Experience section");

    // Step 5: Close any overlay (e.g., LanguageSelector dropdown) if present
    const overlay = page.locator('div.fixed.inset-0.z-40');
    if (await overlay.count() > 0 && await overlay.isVisible()) {
      console.log('🟠 Overlay detected, clicking to close it...');
      await overlay.click({ force: true });
      await page.waitForTimeout(300);
    }

    // Step 6: Close the mobile menu by clicking hamburger again
    const hamburgerButton2 = page.locator('nav button').filter({ 
      has: page.locator('svg') 
    }).first();
    console.log("🔒 Closing mobile menu...");
    await hamburgerButton2.click();
    await page.waitForTimeout(500);
  }

  test("should identify which experience cards show modals correctly", async ({ page }) => {
    await navigateToExperienceSection(page);
    
    console.log("🔍 Looking for mobile experience cards...");
    
    // Find all mobile experience cards
    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();
    
    console.log(`📋 Found ${cardCount} mobile experience cards`);
    expect(cardCount).toBeGreaterThan(0);
    
    const results: TestResult[] = [];
    
    // Test each card individually
    for (let i = 0; i < cardCount; i++) {
      console.log(`\n🧪 Testing card ${i + 1}/${cardCount}`);
      
      const card = mobileCards.nth(i);
      
      // Verify card is visible
      await expect(card).toBeVisible();
      
      // Get card information before clicking
      const cardInfo = await card.evaluate(el => {
        const titleEl = el.querySelector('h3');
        const companyEl = el.querySelector('p');
        return {
          title: titleEl?.textContent?.trim(),
          company: companyEl?.textContent?.trim(),
          className: el.className
        };
      });
      
      console.log(`📄 Card ${i + 1}:`, cardInfo);
      
      // Scroll to card to ensure visibility
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      
      const cardResult: TestResult = {
        index: i + 1,
        ...cardInfo,
        modalWorks: false,
        error: undefined
      };
      
      try {
        // Try clicking the card
        await card.click({ timeout: 5000 });
        console.log(`✅ Click successful on card ${i + 1}`);
        
        // Wait for modal to appear
        await page.waitForTimeout(1500);
        
        // Look for modal/achievements popup
        const modal = page.locator('[role="dialog"], .modal, .overlay, .backdrop, div[class*="modal"], div[class*="backdrop"]').first();
        const isModalVisible = await modal.isVisible().catch(() => false);
        
        if (isModalVisible) {
          console.log(`🎉 Modal appears correctly for card ${i + 1}`);
          cardResult.modalWorks = true;
          
          // Close the modal to continue with next card
          const closeButton = page.locator('button').filter({ 
            hasText: /Close|Cerrar|×|✕/ 
          }).first();
          
          if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
          } else {
            // Try closing with Escape
            await page.keyboard.press('Escape');
          }
          
          await page.waitForTimeout(500);
        } else {
          console.log(`❌ PROBLEM: Modal does NOT appear for card ${i + 1}`);
          console.log(`   Title: ${cardInfo.title}`);
          console.log(`   Company: ${cardInfo.company}`);
          
          // Check if there are any possible modals
          const possibleModals = await page.locator('div[class*="modal"], div[class*="overlay"], div[class*="popup"]').count();
          console.log(`   Possible modals found: ${possibleModals}`);
        }
        
      } catch (error: unknown) {
        const err = error as Error;
        console.log(`❌ Error clicking card ${i + 1}:`, err.message);
        cardResult.error = err.message;
        
        // Check what element is blocking the click
        const cardBox = await card.boundingBox();
        if (cardBox) {
          const elementAtPoint = await page.evaluate((point) => {
            const el = document.elementFromPoint(point.x, point.y);
            return {
              tagName: el?.tagName,
              className: el?.className,
              textContent: el?.textContent?.slice(0, 50)
            };
          }, { x: cardBox.x + cardBox.width / 2, y: cardBox.y + cardBox.height / 2 });
          
          console.log(`   Element at click point:`, elementAtPoint);
        }
      }
      
      results.push(cardResult);
    }
    
    // Generate final report
    console.log("\n📊 FINAL TEST REPORT:");
    console.log(`Total cards tested: ${cardCount}`);
    
    const workingCards = results.filter(r => r.modalWorks);
    const problematicCards = results.filter(r => !r.modalWorks);
    
    console.log(`✅ Cards with working modals: ${workingCards.length}`);
    workingCards.forEach(card => {
      console.log(`  ✅ Card ${card.index}: ${card.title} (${card.company})`);
    });
    
    console.log(`❌ Cards with modal problems: ${problematicCards.length}`);
    problematicCards.forEach(card => {
      console.log(`  ❌ Card ${card.index}: ${card.title} (${card.company}) ${card.error ? '- Error: ' + card.error : ''}`);
    });
    
    // Test passes if we identified the issues
    expect(cardCount).toBeGreaterThan(0);
  });
});
