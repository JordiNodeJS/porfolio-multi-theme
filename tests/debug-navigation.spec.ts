// Quick debugging test to see navigation structure
import { test, expect } from '@playwright/test';

test.describe('Debug Navigation', () => {
  test('show navigation buttons and their text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot
    await page.screenshot({ path: 'navigation-debug.png', fullPage: true });
    
    // Get all navigation buttons
    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} buttons`);
    
    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const text = await buttons[i].textContent();
      const isVisible = await buttons[i].isVisible();
      console.log(`Button ${i}: "${text}" (visible: ${isVisible})`);
    }
    
    // Check if there's any button with text containing "experience" or "experiencia"
    const expButton = page.locator('button').filter({ hasText: /experienc/i });
    const expButtonCount = await expButton.count();
    console.log(`Found ${expButtonCount} buttons with "experienc" text`);
    
    if (expButtonCount > 0) {
      const firstExpButton = expButton.first();
      const text = await firstExpButton.textContent();
      console.log(`First experience button text: "${text}"`);
    }
  });
});
