import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation Debugging', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('Debug navigation structure in mobile', async ({ page }) => {
    console.log('=== MOBILE NAVIGATION DEBUG ===');
    
    // Take screenshot for visual debugging
    await page.screenshot({ path: 'debug-mobile-nav.png', fullPage: true });
    
    // Check if navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    console.log('Navigation element exists:', await nav.count());
    
    // Check mobile menu button (hamburger)
    const hamburgerButton = page.locator('nav button').filter({ hasText: /^$/ }).last(); // Button with no text (just icon)
    const hamburgerExists = await hamburgerButton.count();
    console.log('Hamburger button count:', hamburgerExists);
    
    if (hamburgerExists > 0) {
      const isHamburgerVisible = await hamburgerButton.isVisible();
      console.log('Hamburger button visible:', isHamburgerVisible);
      
      // Try clicking hamburger to open mobile menu
      if (isHamburgerVisible) {
        await hamburgerButton.click();
        await page.waitForTimeout(500); // Wait for animation
        
        // Check if mobile menu opened
        const mobileMenu = page.locator('nav > div:last-child'); // The mobile menu div
        const isMobileMenuVisible = await mobileMenu.isVisible();
        console.log('Mobile menu visible after click:', isMobileMenuVisible);
        
        // Check for Experience button in mobile menu
        const experienceButton = page.locator('nav button', { hasText: 'Experience' });
        const experienceCount = await experienceButton.count();
        console.log('Experience buttons found:', experienceCount);
        
        for (let i = 0; i < experienceCount; i++) {
          const button = experienceButton.nth(i);
          const isVisible = await button.isVisible();
          const boundingBox = await button.boundingBox();
          console.log(`Experience button ${i}: visible=${isVisible}, boundingBox=`, boundingBox);
        }
      }
    }
    
    // Check desktop navigation buttons (should be hidden on mobile)
    const desktopNavButtons = page.locator('nav div.hidden.md\\:flex button');
    const desktopButtonCount = await desktopNavButtons.count();
    console.log('Desktop nav buttons count:', desktopButtonCount);
    
    for (let i = 0; i < desktopButtonCount; i++) {
      const button = desktopNavButtons.nth(i);
      const isVisible = await button.isVisible();
      const text = await button.textContent();
      console.log(`Desktop button ${i} (${text}): visible=${isVisible}`);
    }
    
    // Check all Experience buttons in page
    const allExperienceButtons = page.locator('button', { hasText: 'Experience' });
    const allExperienceCount = await allExperienceButtons.count();
    console.log('All Experience buttons on page:', allExperienceCount);
    
    for (let i = 0; i < allExperienceCount; i++) {
      const button = allExperienceButtons.nth(i);
      const isVisible = await button.isVisible();
      const boundingBox = await button.boundingBox();
      const computedStyle = await button.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          height: style.height,
          width: style.width,
          overflow: style.overflow
        };
      });
      console.log(`All Experience button ${i}: visible=${isVisible}, boundingBox=`, boundingBox, 'computedStyle=', computedStyle);
    }
  });

  test('Test mobile menu interaction step by step', async ({ page }) => {
    console.log('=== MOBILE MENU INTERACTION TEST ===');
    
    // Find and click hamburger menu
    const hamburger = page.locator('nav button').filter({ has: page.locator('svg') }).last();
    await expect(hamburger).toBeVisible();
    
    console.log('Clicking hamburger menu...');
    await hamburger.click();
    
    // Wait for mobile menu to appear
    await page.waitForTimeout(1000);
    
    // Look for Experience button in mobile menu specifically
    const mobileExperienceButton = page.locator('nav button').filter({ hasText: 'Experience' });
    
    console.log('Searching for Experience button in mobile menu...');
    const buttonCount = await mobileExperienceButton.count();
    console.log(`Found ${buttonCount} Experience buttons`);
    
    if (buttonCount > 0) {
      const firstButton = mobileExperienceButton.first();
      const isVisible = await firstButton.isVisible();
      const isEnabled = await firstButton.isEnabled();
      
      console.log(`First Experience button - visible: ${isVisible}, enabled: ${isEnabled}`);
      
      if (isVisible) {
        console.log('Attempting to click Experience button...');
        await firstButton.click({ timeout: 5000 });
        console.log('Click successful!');
      } else {
        console.log('Button not visible, checking why...');
        const boundingBox = await firstButton.boundingBox();
        console.log('Bounding box:', boundingBox);
      }
    }
  });
});
