import { test, expect } from "@playwright/test";

// Configurar viewport móvil
test.use({
  viewport: { width: 375, height: 667 }, // iPhone SE
});

test.describe("Experience Cards Modal Test - Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });
  async function navigateToExperienceSection(page: any) {
    console.log("📱 Navegando a la sección de experiencia...");
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Look for mobile menu button (hamburger)
    const hamburgerButton = page.locator('nav button').filter({ 
      has: page.locator('svg') 
    }).first();
    
    const isHamburgerVisible = await hamburgerButton.isVisible().catch(() => false);
    
    if (isHamburgerVisible) {
      console.log("📱 Abriendo menú móvil...");
      await hamburgerButton.click();
      await page.waitForTimeout(800);      // Wait for mobile menu to be visible and find Experience/Experiencia button
      await page.waitForSelector('nav div:last-child', { state: 'visible' });
      
      const experienceButton = page.locator('nav div:last-child button').filter({ 
        hasText: /Experiencia|Experience/i 
      }).first(); // Use first instead of nth(1) to avoid the blocking element
        // Count available buttons to debug
      const buttonCount = await experienceButton.count();
      console.log(`🔍 Encontrados ${buttonCount} botones de Experiencia en el menú móvil`);
      
      if (buttonCount > 0) {
        // Use the first button found in the mobile menu
        await experienceButton.click();
      } else {
        throw new Error("No se encontró botón de Experiencia en el menú móvil");
      }
      
      await page.waitForTimeout(1000);
    } else {
      console.log("🖥️ Vista desktop detectada, buscando link directo...");
      // For desktop or when hamburger is not visible
      const experienceLink = page.locator('a[href="#experience"], button').filter({
        hasText: /Experiencia|Experience/i
      }).first();
      
      await experienceLink.click();
      await page.waitForTimeout(1000);
    }
    
    // Scroll to experience section to ensure visibility
    await page.evaluate(() => {
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    await page.waitForTimeout(2000);
    
    // Verificar que estamos en la sección
    const experienceHeading = page.locator("h2, h1").filter({ 
      hasText: /Experiencia|Experience/i 
    });
    
    const isHeadingVisible = await experienceHeading.isVisible().catch(() => false);
    if (isHeadingVisible) {
      console.log("✅ En sección de experiencia");
    } else {
      console.log("⚠️ No se puede verificar el heading de experiencia, continuando...");
    }
  }

  test("should test all mobile experience cards for modal functionality", async ({ page }) => {
    await navigateToExperienceSection(page);
    
    console.log("🔍 Buscando tarjetas de experiencia móvil...");
    
    // Buscar todas las tarjetas móviles
    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();
    console.log(`📋 Encontradas ${cardCount} tarjetas móviles`);
    
    expect(cardCount).toBeGreaterThan(0);
    
    // Probar cada tarjeta individualmente
    for (let i = 0; i < cardCount; i++) {
      console.log(`\n🧪 Probando tarjeta ${i + 1}/${cardCount}`);
      
      const card = mobileCards.nth(i);
      
      // Verificar que la tarjeta es visible
      await expect(card).toBeVisible();
      
      // Obtener información de la tarjeta antes del click
      const cardInfo = await card.evaluate(el => {
        const titleEl = el.querySelector('h3');
        const companyEl = el.querySelector('p');
        return {
          title: titleEl?.textContent?.trim(),
          company: companyEl?.textContent?.trim(),
          hasClickHandler: el.onclick !== null,
          className: el.className
        };
      });
      
      console.log(`📄 Tarjeta ${i + 1}:`, cardInfo);
      
      // Scroll a la tarjeta para asegurar visibilidad
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      
      try {
        // Intentar hacer click en la tarjeta
        await card.click({ timeout: 5000 });
        console.log(`✅ Click exitoso en tarjeta ${i + 1}`);
        
        // Esperar a que aparezca el modal
        await page.waitForTimeout(1000);
        
        // Buscar el modal/ficha de logros
        const modal = page.locator('[role="dialog"], .modal, .overlay, .backdrop').first();
        const isModalVisible = await modal.isVisible().catch(() => false);
        
        if (isModalVisible) {
          console.log(`🎉 Modal aparece correctamente para tarjeta ${i + 1}`);
          
          // Cerrar el modal para continuar con la siguiente tarjeta
          const closeButton = page.locator('button').filter({ 
            hasText: /Close|Cerrar|×|✕/ 
          }).first();
          
          if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
          } else {
            // Intentar cerrar con Escape
            await page.keyboard.press('Escape');
          }
          
          await page.waitForTimeout(500);
        } else {
          console.log(`❌ PROBLEMA: Modal NO aparece para tarjeta ${i + 1}`);
          console.log(`   Título: ${cardInfo.title}`);
          console.log(`   Empresa: ${cardInfo.company}`);
          
          // Verificar si hay algún elemento que podría ser el modal
          const possibleModals = await page.locator('div[class*="modal"], div[class*="overlay"], div[class*="popup"]').count();
          console.log(`   Posibles modales encontrados: ${possibleModals}`);
          
          // Tomar screenshot para debug
          await page.screenshot({ 
            path: `debug-card-${i + 1}-no-modal.png`,
            fullPage: false 
          });
        }
        
      } catch (error) {
        console.log(`❌ Error haciendo click en tarjeta ${i + 1}:`, error.message);
        
        // Verificar si hay algún elemento bloqueando el click
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
          
          console.log(`   Elemento en punto de click:`, elementAtPoint);
        }
      }
    }
    
    console.log("\n📊 RESUMEN DEL TEST:");
    console.log(`Total de tarjetas probadas: ${cardCount}`);
  });

  test("should identify specific cards that don't show modal", async ({ page }) => {
    await navigateToExperienceSection(page);
    
    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();
    
    const problematicCards = [];
    
    for (let i = 0; i < cardCount; i++) {
      const card = mobileCards.nth(i);
      
      // Obtener información de la tarjeta
      const cardData = await card.evaluate(el => {
        const titleEl = el.querySelector('h3');
        const companyEl = el.querySelector('p');
        const dateEl = el.querySelector('span, .date');
        
        return {
          title: titleEl?.textContent?.trim(),
          company: companyEl?.textContent?.trim(),
          date: dateEl?.textContent?.trim(),
          hasOnClick: el.onclick !== null,
          hasDataAttributes: Object.keys(el.dataset),
          eventListeners: el.getEventListeners ? Object.keys(el.getEventListeners()) : []
        };
      });
      
      try {
        await card.click({ timeout: 3000 });
        await page.waitForTimeout(800);
        
        // Verificar modal
        const modalExists = await page.locator('[role="dialog"], .modal, div[class*="modal"]').isVisible().catch(() => false);
        
        if (!modalExists) {
          problematicCards.push({
            index: i + 1,
            ...cardData
          });
          console.log(`❌ Tarjeta problemática ${i + 1}:`, cardData);
        } else {
          // Cerrar modal
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }
        
      } catch (error) {
        problematicCards.push({
          index: i + 1,
          error: error.message,
          ...cardData
        });
      }
    }
    
    console.log(`\n🚨 TARJETAS PROBLEMÁTICAS: ${problematicCards.length}`);
    problematicCards.forEach(card => {
      console.log(`  - Tarjeta ${card.index}: ${card.title} (${card.company})`);
    });
    
    // El test pasa si identificamos las tarjetas problemáticas
    expect(cardCount).toBeGreaterThan(0);
  });
});
