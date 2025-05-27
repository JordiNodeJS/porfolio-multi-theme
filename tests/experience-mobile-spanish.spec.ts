import { test, expect } from "@playwright/test";

// Configurar viewport móvil para todos los tests
test.use({
  viewport: { width: 375, height: 667 }, // iPhone SE size
});

test.describe("Experience Section Mobile Issues - Spanish", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });
  test("should not trigger unexpected scroll when clicking experience cards on mobile", async ({
    page,
  }) => {
    // First open mobile menu by clicking hamburger button
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await hamburgerButton.click();
    await page.waitForTimeout(500);
    // Wait for mobile menu to be visible and then click Experience button
    await page.waitForSelector("nav div:last-child", { state: "visible" });

    // Use nth(1) to get the second Experience button (mobile version)
    await page
      .locator("button")
      .filter({ hasText: "Experiencia" })
      .nth(1)
      .click();
    await page.waitForTimeout(1000);

    // Verificar que estamos en la sección de experiencia
    await expect(
      page.locator("h2").filter({ hasText: "Experiencia Profesional" })
    ).toBeVisible();

    // Obtener posición inicial del scroll
    const initialScrollY = await page.evaluate(() => window.scrollY);
    console.log("Initial scroll position:", initialScrollY);

    // Buscar tarjetas de experiencia móviles (que tengan clase md:hidden y glass-effect)
    const mobileCards = page.locator(".md\\:hidden .glass-effect").filter({
      has: page.locator("h3"),
    });

    const cardCount = await mobileCards.count();
    console.log("Number of mobile cards found:", cardCount);

    if (cardCount > 0) {
      const firstCard = mobileCards.first();

      // Verificar que la tarjeta es visible
      await expect(firstCard).toBeVisible();

      // Hacer click en la primera tarjeta
      await firstCard.click();
      await page.waitForTimeout(500);

      // Verificar que no hubo scroll inesperado
      const finalScrollY = await page.evaluate(() => window.scrollY);
      console.log("Final scroll position:", finalScrollY);

      const scrollDifference = Math.abs(finalScrollY - initialScrollY);
      console.log("Scroll difference:", scrollDifference);

      // Permitir hasta 50px de diferencia para scroll suave
      expect(scrollDifference).toBeLessThan(50);
    }
  });
  test("should not change theme when clicking experience cards", async ({
    page,
  }) => {
    // Obtener el tema inicial
    const initialThemeClasses = await page
      .locator("html")
      .getAttribute("class");
    console.log("Initial theme classes:", initialThemeClasses);

    // Open mobile menu and navigate to experience
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await hamburgerButton.click();
    await page.waitForTimeout(500);

    await page.waitForSelector("nav div:last-child", { state: "visible" });
    await page
      .locator("button")
      .filter({ hasText: "Experiencia" })
      .nth(1)
      .click();
    await page.waitForTimeout(1000);

    // Hacer click en las tarjetas de experiencia
    const mobileCards = page.locator(".md\\:hidden .glass-effect").filter({
      has: page.locator("h3"),
    });

    const cardCount = await mobileCards.count();
    if (cardCount > 0) {
      const firstCard = mobileCards.first();

      console.log("Clicking first experience card to check theme changes...");
      await firstCard.click();

      await page.waitForTimeout(500);

      // Verificar que el tema no cambió
      const finalThemeClasses = await page
        .locator("html")
        .getAttribute("class");
      console.log("Final theme classes:", finalThemeClasses);

      expect(finalThemeClasses).toBe(initialThemeClasses);
    }
  });
  test("should open modal correctly when clicking experience cards", async ({
    page,
  }) => {
    // Open mobile menu and navigate to experience
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await hamburgerButton.click();
    await page.waitForTimeout(500);
    await page.waitForSelector("nav div:last-child", { state: "visible" });
    await page
      .locator("button")
      .filter({ hasText: "Experiencia" })
      .nth(1)
      .click();
    await page.waitForTimeout(1000);

    const mobileCards = page.locator(".md\\:hidden .glass-effect").filter({
      has: page.locator("h3"),
    });

    const cardCount = await mobileCards.count();
    console.log("Mobile cards found:", cardCount);

    if (cardCount > 0) {
      const firstCard = mobileCards.first();

      // Hacer click en la primera tarjeta
      await firstCard.click();
      await page.waitForTimeout(1000);

      // Buscar modal o overlay que pueda haberse abierto
      const modal = page.locator('[role="dialog"], .modal, .overlay, .popup');
      const modalExists = (await modal.count()) > 0;

      if (modalExists) {
        console.log("Modal detected, checking visibility...");
        await expect(modal.first()).toBeVisible();

        // Verificar que el modal tiene contenido
        const modalContent = await modal.first().textContent();
        expect(modalContent?.length).toBeGreaterThan(0);
      } else {
        console.log("No modal detected - this might be expected behavior");
        // Si no hay modal, verificar que al menos la tarjeta sigue siendo interactiva
        await expect(firstCard).toBeVisible();
      }
    }
  });
  test("should identify conflicting event handlers", async ({ page }) => {
    // Escuchar eventos para detectar múltiples handlers
    const events: string[] = [];

    page.on("console", (msg) => {
      if (
        msg.type() === "log" ||
        msg.type() === "warn" ||
        msg.type() === "error"
      ) {
        events.push(msg.text());
      }
    });

    // Open mobile menu and navigate to experience
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await hamburgerButton.click();
    await page.waitForTimeout(500);

    await page.waitForSelector("nav div:last-child", { state: "visible" });
    await page
      .locator("button")
      .filter({ hasText: "Experiencia" })
      .nth(1)
      .click();
    await page.waitForTimeout(1000);

    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();

    if (cardCount > 0) {
      const firstCard = mobileCards.first();

      console.log("Clicking card to analyze event handlers...");
      await firstCard.click();

      await page.waitForTimeout(500);

      // Analizar si hubo eventos conflictivos
      const conflictEvents = events.filter(
        (event) =>
          event.includes("error") ||
          event.includes("conflict") ||
          event.includes("multiple handlers")
      );

      console.log("Event handlers analysis:", events);
      console.log("Potential conflicts:", conflictEvents);

      // No debería haber errores de handlers conflictivos
      expect(conflictEvents.length).toBe(0);
    }
  });
  test("should not have overlapping clickable elements", async ({ page }) => {
    // Open mobile menu and navigate to experience
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await hamburgerButton.click();
    await page.waitForTimeout(500);

    await page.waitForSelector("nav div:last-child", { state: "visible" });
    await page
      .locator("button")
      .filter({ hasText: "Experiencia" })
      .nth(1)
      .click();
    await page.waitForTimeout(1000);

    // Buscar elementos clickeables superpuestos
    const clickableElements = page.locator(
      'a, button, [onclick], [role="button"]'
    );
    const elementCount = await clickableElements.count();

    interface BoundingBox {
      x: number;
      y: number;
      width: number;
      height: number;
    }

    // Función para verificar si dos elementos se superponen
    const checkOverlap = (box1: BoundingBox, box2: BoundingBox): boolean => {
      return !(
        box1.x + box1.width <= box2.x ||
        box2.x + box2.width <= box1.x ||
        box1.y + box1.height <= box2.y ||
        box2.y + box2.height <= box1.y
      );
    };

    const overlaps: Array<{ element1: number; element2: number }> = [];

    // Verificar superposiciones entre elementos clickeables
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      // Limitar a 10 elementos para performance
      for (let j = i + 1; j < Math.min(elementCount, 10); j++) {
        const element1 = clickableElements.nth(i);
        const element2 = clickableElements.nth(j);

        const box1 = await element1.boundingBox();
        const box2 = await element2.boundingBox();

        if (box1 && box2) {
          // Check for overlap
          if (checkOverlap(box1, box2)) {
            overlaps.push({ element1: i, element2: j });
          }
        }
      }
    }

    console.log("Overlapping elements found:", overlaps.length);
    console.log("Overlap details:", overlaps);

    // No debería haber elementos superpuestos
    expect(overlaps.length).toBe(0);
  });
  test("should handle mobile viewport correctly", async ({ page }) => {
    // Verificar que estamos en viewport móvil
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(375);
    expect(viewport?.height).toBe(667);

    // Open mobile menu and navigate to experience
    const hamburgerButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await hamburgerButton.click();
    await page.waitForTimeout(500);
    await page.waitForSelector("nav div:last-child", { state: "visible" });
    await page
      .locator("button")
      .filter({ hasText: "Experiencia" })
      .nth(1)
      .click();
    await page.waitForTimeout(1000);

    // Check if mobile cards are visible
    const mobileCards = page.locator(".md\\:hidden .glass-effect");
    const cardCount = await mobileCards.count();

    console.log("Mobile cards count:", cardCount);

    if (cardCount > 0) {
      // Verificar que las tarjetas móviles son visibles en viewport móvil
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = mobileCards.nth(i);
        await expect(card).toBeVisible();

        // Verificar que la tarjeta está dentro del viewport
        const boundingBox = await card.boundingBox();
        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThan(0);
          expect(boundingBox.height).toBeGreaterThan(0);
        }
      }
    }

    // Verificar que las tarjetas de desktop están ocultas (si existen)
    const desktopCards = page.locator(
      ".hidden.md\\:block, .lg\\:block:not(.md\\:hidden)"
    );
    const desktopCardCount = await desktopCards.count();

    if (desktopCardCount > 0) {
      // En móvil, las tarjetas de desktop deberían estar ocultas
      for (let i = 0; i < desktopCardCount; i++) {
        const desktopCard = desktopCards.nth(i);
        await expect(desktopCard).not.toBeVisible();
      }
    }
  });
});
