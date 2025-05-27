import { test, expect } from '@playwright/test';

// Configurar viewport móvil
test.use({
  viewport: { width: 375, height: 667 }
});

test.describe('Mobile Navigation Overlay Issue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should identify navigation blocking experience cards interaction', async ({ page }) => {
    // Navegar a la sección de experiencia
    await page.locator('button').filter({ hasText: 'Experiencia' }).first().click();
    await page.waitForTimeout(1000);

    // Verificar que estamos en la sección de experiencia
    await expect(page.locator('h2').filter({ hasText: 'Experiencia Profesional' })).toBeVisible();

    // Buscar tarjetas de experiencia móviles
    const mobileCards = page.locator('.glass-effect').filter({
      has: page.locator('h3')
    });

    const cardCount = await mobileCards.count();
    console.log('Mobile cards found:', cardCount);

    if (cardCount > 0) {
      const firstCard = mobileCards.first();
      await expect(firstCard).toBeVisible();

      // Obtener la posición de la tarjeta
      const cardBox = await firstCard.boundingBox();
      console.log('Card bounding box:', cardBox);

      // Verificar elementos que pueden estar superpuestos
      const navigation = page.locator('nav');
      const navBox = await navigation.boundingBox();
      console.log('Navigation bounding box:', navBox);

      // Buscar elementos con z-index alto que puedan interferir
      const overlayElements = page.locator('[class*="z-"], [style*="z-index"]');
      const overlayCount = await overlayElements.count();
      console.log('Elements with z-index found:', overlayCount);

      // Verificar si la navegación está bloqueando la interacción
      if (cardBox && navBox) {
        const navigationOverlapsCard = (
          navBox.y + navBox.height > cardBox.y && 
          navBox.y < cardBox.y + cardBox.height
        );
        
        console.log('Navigation overlaps card area:', navigationOverlapsCard);
        
        if (navigationOverlapsCard) {
          console.log('❌ PROBLEM DETECTED: Navigation is overlapping experience cards');
          console.log('Navigation height:', navBox.height);
          console.log('Card top position:', cardBox.y);
          console.log('Navigation bottom position:', navBox.y + navBox.height);
        }
      }

      // Intentar hacer click en la tarjeta y capturar el error
      try {
        await firstCard.click({ timeout: 3000 });
        console.log('✅ Card click successful');
      } catch (error) {
        console.log('❌ Card click failed:', error.message);
        
        // Verificar si el error menciona interceptación de eventos
        if (error.message.includes('intercepts pointer events')) {
          console.log('🚨 CONFIRMED: Navigation is intercepting pointer events');
          
          // Extraer información del elemento que está interceptando
          const interceptingElement = error.message.match(/from <([^>]+)>/);
          if (interceptingElement) {
            console.log('Intercepting element:', interceptingElement[1]);
          }
        }
      }

      // Verificar si hay elementos clickables superpuestos en el área de la tarjeta
      if (cardBox) {
        const centerX = cardBox.x + cardBox.width / 2;
        const centerY = cardBox.y + cardBox.height / 2;
        
        // Usar elementAt para encontrar qué elemento está en el centro de la tarjeta
        const elementAtCenter = await page.locator(`*`).elementAt(centerX, centerY);
        if (elementAtCenter) {
          const elementText = await elementAtCenter.textContent().catch(() => 'No text');
          const elementClass = await elementAtCenter.getAttribute('class').catch(() => 'No class');
          console.log('Element at card center:', { text: elementText, class: elementClass });
        }
      }
    }
  });

  test('should check mobile menu toggle functionality', async ({ page }) => {
    // Buscar el botón de menú hamburguesa
    const menuButton = page.locator('nav button').filter({ hasText: '' }).first(); // Botón sin texto específico
    
    try {
      await expect(menuButton).toBeVisible();
      console.log('Menu button found and visible');
      
      // Verificar estado inicial del menú
      const navigationMenu = page.locator('nav .flex:has(button[href*="Experiencia"], button:has-text("Experiencia"))');
      const isMenuVisible = await navigationMenu.isVisible();
      console.log('Initial menu visibility:', isMenuVisible);
      
      // Hacer click en el botón del menú
      await menuButton.click();
      await page.waitForTimeout(500);
      
      const isMenuVisibleAfterClick = await navigationMenu.isVisible();
      console.log('Menu visibility after toggle:', isMenuVisibleAfterClick);
      
      if (isMenuVisible === isMenuVisibleAfterClick) {
        console.log('⚠️  POTENTIAL ISSUE: Menu toggle might not be working correctly');
      }
      
    } catch (error) {
      console.log('❌ Could not interact with mobile menu:', error.message);
    }
  });

  test('should measure navigation z-index and positioning issues', async ({ page }) => {
    // Obtener información detallada sobre la navegación
    const navInfo = await page.locator('nav').evaluate((nav) => {
      const styles = window.getComputedStyle(nav);
      return {
        position: styles.position,
        zIndex: styles.zIndex,
        top: styles.top,
        height: nav.offsetHeight,
        width: nav.offsetWidth,
        classes: nav.className
      };
    });
    
    console.log('Navigation styles:', navInfo);
    
    // Verificar si la navegación está fija y con z-index alto
    if (navInfo.position === 'fixed' && parseInt(navInfo.zIndex) > 40) {
      console.log('🚨 HIGH Z-INDEX FIXED NAVIGATION DETECTED');
      console.log('This could be blocking interaction with content below');
    }
    
    // Buscar elementos en el área donde deberían estar las tarjetas de experiencia
    const experienceSection = page.locator('section, div').filter({
      has: page.locator('h2:has-text("Experiencia Profesional")')
    });
    
    if (await experienceSection.count() > 0) {
      const sectionBox = await experienceSection.first().boundingBox();
      
      if (sectionBox && navInfo.height) {
        const navigationBlocksContent = sectionBox.y < navInfo.height;
        console.log('Navigation blocks content area:', navigationBlocksContent);
        
        if (navigationBlocksContent) {
          console.log('❌ LAYOUT PROBLEM: Fixed navigation overlaps content');
          console.log('Content starts at:', sectionBox.y);
          console.log('Navigation height:', navInfo.height);
        }
      }
    }
  });
});
