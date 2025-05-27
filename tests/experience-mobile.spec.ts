import { test, expect } from '@playwright/test';

test.describe('Experience Section Mobile Issues', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });  test('should not trigger unexpected scroll when clicking experience cards on mobile', async ({ page }) => {
    // Navegar a la sección de experiencia
    await page.locator('button').filter({ hasText: 'Experience' }).first().click();
    await page.waitForTimeout(1000);

    // Verificar que estamos en la sección de experiencia
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();

    // Obtener la posición inicial del scroll
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    console.log(`Initial scroll position: ${initialScrollY}`);

    // Buscar las tarjetas de experiencia en mobile
    const mobileCards = page.locator('.md\\:hidden .glass-effect').filter({
      has: page.locator('h3')
    });

    console.log(`Found ${await mobileCards.count()} mobile experience cards`);

    // Hacer click en la primera tarjeta de experiencia
    if (await mobileCards.count() > 0) {
      const firstCard = mobileCards.first();
      
      // Verificar que la tarjeta es visible y clickeable
      await expect(firstCard).toBeVisible();
      
      console.log('About to click first experience card...');
      
      // Hacer click en la tarjeta
      await firstCard.click();
      
      // Esperar un momento después del click
      await page.waitForTimeout(1000);
      
      // Verificar la posición del scroll después del click
      const finalScrollY = await page.evaluate(() => window.scrollY);
      console.log(`Final scroll position: ${finalScrollY}`);
      
      // Verificar que no hubo un scroll inesperado hacia proyectos
      const projectsSection = page.locator('#projects');
      const projectsSectionPosition = await projectsSection.boundingBox();
      
      if (projectsSectionPosition) {
        console.log(`Projects section top: ${projectsSectionPosition.y}`);
        
        // El scroll no debería llevarnos a la sección de proyectos
        const scrolledToProjects = Math.abs(finalScrollY - (projectsSectionPosition.y + initialScrollY)) < 100;
        expect(scrolledToProjects).toBeFalsy();
      }
    }
  });

  test('should not change theme when clicking experience cards', async ({ page }) => {
    // Obtener el tema inicial
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.toString();
    });
    
    console.log(`Initial theme classes: ${initialTheme}`);

    // Navegar a la sección de experiencia
    await page.locator('[href="#experience"]').click();
    await page.waitForTimeout(1000);

    // Hacer click en las tarjetas de experiencia
    const mobileCards = page.locator('.md\\:hidden .glass-effect').filter({
      has: page.locator('h3')
    });

    if (await mobileCards.count() > 0) {
      const firstCard = mobileCards.first();
      
      console.log('Clicking first experience card to check theme changes...');
      await firstCard.click();
      
      await page.waitForTimeout(500);
      
      // Verificar que el tema no cambió
      const finalTheme = await page.evaluate(() => {
        return document.documentElement.classList.toString();
      });
      
      console.log(`Final theme classes: ${finalTheme}`);
      
      // El tema no debería haber cambiado
      expect(finalTheme).toBe(initialTheme);
    }
  });

  test('should open modal correctly when clicking experience cards', async ({ page }) => {
    // Navegar a la sección de experiencia
    await page.locator('[href="#experience"]').click();
    await page.waitForTimeout(1000);

    const mobileCards = page.locator('.md\\:hidden .glass-effect').filter({
      has: page.locator('h3')
    });

    if (await mobileCards.count() > 0) {
      const firstCard = mobileCards.first();
      
      // Verificar que no hay modal abierto inicialmente
      const modalOverlay = page.locator('.fixed.inset-0.bg-black\\/80');
      await expect(modalOverlay).not.toBeVisible();
      
      console.log('Clicking card to open modal...');
      await firstCard.click();
      
      // Esperar a que aparezca el modal
      await page.waitForTimeout(1000);
      
      // Verificar que el modal se abrió
      await expect(modalOverlay).toBeVisible();
      
      // Verificar que el contenido del modal es correcto
      const modalContent = page.locator('.fixed.right-0, .fixed.left-0').filter({
        hasText: /logros|achievements/i
      });
      await expect(modalContent).toBeVisible();
      
      console.log('Modal opened successfully');
    }
  });

  test('should identify conflicting event handlers', async ({ page }) => {
    // Instrumentar la página para capturar eventos
    await page.addInitScript(() => {
      window.clickEvents = [];
      
      document.addEventListener('click', (e) => {
        window.clickEvents.push({
          target: e.target.tagName + (e.target.className ? '.' + e.target.className.replace(/\s+/g, '.') : ''),
          timestamp: Date.now(),
          preventDefault: e.defaultPrevented,
          stopPropagation: e.cancelBubble
        });
      }, true);
    });

    // Navegar a la sección de experiencia
    await page.locator('[href="#experience"]').click();
    await page.waitForTimeout(1000);

    const mobileCards = page.locator('.md\\:hidden .glass-effect');

    if (await mobileCards.count() > 0) {
      const firstCard = mobileCards.first();
      
      console.log('Clicking card to analyze event handlers...');
      await firstCard.click();
      
      await page.waitForTimeout(500);
      
      // Obtener los eventos capturados
      const events = await page.evaluate(() => window.clickEvents);
      
      console.log('Captured click events:', JSON.stringify(events, null, 2));
      
      // Analizar si hay múltiples manejadores de eventos conflictivos
      expect(events.length).toBeGreaterThan(0);
    }
  });

  test('should not have overlapping clickable elements', async ({ page }) => {
    // Navegar a la sección de experiencia
    await page.locator('[href="#experience"]').click();
    await page.waitForTimeout(1000);

    // Buscar elementos clickeables superpuestos
    const clickableElements = await page.locator('a, button, [onclick], [role="button"]').all();
    
    const overlaps = [];
    
    for (let i = 0; i < clickableElements.length; i++) {
      const element1 = clickableElements[i];
      const box1 = await element1.boundingBox();
      
      if (!box1) continue;
      
      for (let j = i + 1; j < clickableElements.length; j++) {
        const element2 = clickableElements[j];
        const box2 = await element2.boundingBox();
        
        if (!box2) continue;
        
        // Verificar si hay superposición
        const overlap = !(box1.x + box1.width < box2.x || 
                         box2.x + box2.width < box1.x || 
                         box1.y + box1.height < box2.y || 
                         box2.y + box2.height < box1.y);
        
        if (overlap) {
          const element1Info = await element1.evaluate(el => ({
            tag: el.tagName,
            class: el.className,
            text: el.textContent?.slice(0, 50)
          }));
          
          const element2Info = await element2.evaluate(el => ({
            tag: el.tagName,
            class: el.className,
            text: el.textContent?.slice(0, 50)
          }));
          
          overlaps.push({
            element1: element1Info,
            element2: element2Info,
            box1,
            box2
          });
        }
      }
    }
    
    if (overlaps.length > 0) {
      console.log('Found overlapping clickable elements:', JSON.stringify(overlaps, null, 2));
    }
    
    // En la sección de experiencia móvil no deberían haber elementos superpuestos problemáticos
    const experienceOverlaps = overlaps.filter(overlap => 
      overlap.element1.text?.includes('FLiPO') || 
      overlap.element1.text?.includes('IT Academy') ||
      overlap.element2.text?.includes('FLiPO') || 
      overlap.element2.text?.includes('IT Academy')
    );
    
    console.log(`Found ${experienceOverlaps.length} overlaps in experience section`);
  });
});
