import { test, expect } from "@playwright/test";

test.describe("Navegación - Solución de Offset Implementada", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Esperar a que la página cargue completamente
    await page.waitForSelector("#hero", { timeout: 10000 });
    await page.waitForTimeout(2000); // Dar tiempo adicional para animaciones
  });

  test("debería mostrar los títulos de sección correctamente después de implementar el offset", async ({
    page,
  }) => {
    // Obtener la altura de la navegación
    const navigation = page.locator("nav");
    const navHeight = await navigation.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    console.log("Altura de navegación:", navHeight);

    const sectionsToTest = [
      { name: "Experience", selector: "#experience", title: "#experience h2" },
      { name: "Projects", selector: "#projects", title: "#projects h2" },
      { name: "Skills", selector: "#skills", title: "#skills h2" },
      { name: "Education", selector: "#education", title: "#education h2" },
    ];

    for (const section of sectionsToTest) {
      console.log(`\n🧪 Testing section: ${section.name}`);

      // Hacer scroll a la parte superior para reset
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Hacer clic en el botón de navegación correspondiente (usando el selector de botón)
      const navButton = page
        .locator(`nav button`)
        .filter({ hasText: new RegExp(section.name, "i") });
      await navButton.click();

      // Esperar a que el scroll termine
      await page.waitForTimeout(2000);

      // Verificar que el título de la sección está visible y correctamente posicionado
      const sectionTitle = page.locator(section.title).first();
      await expect(sectionTitle).toBeVisible();

      const titleBounds = await sectionTitle.boundingBox();
      if (titleBounds) {
        console.log(`  📍 Posición Y del título: ${titleBounds.y}px`);
        console.log(`  📏 Altura de navegación: ${navHeight}px`);

        // El título debería estar debajo de la navegación + padding
        const expectedMinY = navHeight + 10; // 10px de margen mínimo

        if (titleBounds.y >= expectedMinY) {
          console.log(`  ✅ ${section.name}: Título correctamente posicionado`);
          console.log(
            `  📐 Margen con navegación: ${titleBounds.y - navHeight}px`
          );
        } else {
          console.log(`  ❌ ${section.name}: Título aún parcialmente oculto`);
          console.log(`  📐 Déficit: ${expectedMinY - titleBounds.y}px`);
        }

        // Assertion: El título debe estar al menos 10px debajo de la navegación
        expect(titleBounds.y).toBeGreaterThanOrEqual(expectedMinY);
      }
    }
  });

  test("debería funcionar correctamente en dispositivos móviles", async ({
    page,
  }) => {
    // Simular viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });

    const navigation = page.locator("nav");
    const navHeight = await navigation.evaluate(
      (el) => el.getBoundingClientRect().height
    );

    // Abrir el menú móvil
    const mobileMenuButton = page
      .locator("nav button")
      .filter({ hasText: /menu|☰/ })
      .or(page.locator('[data-testid="mobile-menu-button"]'))
      .or(page.locator("nav button:has(svg)"));
    await mobileMenuButton.click();
    await page.waitForTimeout(500);

    // Hacer clic en "Experience" en el menú móvil
    const experienceButton = page
      .locator("nav button")
      .filter({ hasText: /experience|experiencia/i });
    await experienceButton.click();

    // Esperar a que el scroll termine y el menú se cierre
    await page.waitForTimeout(2000);

    // Verificar posicionamiento
    const experienceTitle = page.locator("#experience h2").first();
    await expect(experienceTitle).toBeVisible();

    const titleBounds = await experienceTitle.boundingBox();
    if (titleBounds) {
      console.log(`📱 Móvil - Posición Y del título: ${titleBounds.y}px`);
      console.log(`📱 Móvil - Altura de navegación: ${navHeight}px`);

      const expectedMinY = navHeight + 10;
      expect(titleBounds.y).toBeGreaterThanOrEqual(expectedMinY);
      console.log(`📱 ✅ Móvil: Navegación funcionando correctamente`);
    }
  });

  test("debería mantener el comportamiento correcto al cambiar entre temas", async ({
    page,
  }) => {
    // Probar con tema oscuro
    console.log("🌙 Probando con tema oscuro...");
    await page.click('[data-testid="theme-toggle"]').catch(() => {
      console.log(
        "Theme toggle no encontrado con data-testid, probando selector alternativo"
      );
    });

    // Buscar el botón de tema de manera más flexible
    const themeButton = page
      .locator("button")
      .filter({ hasText: /theme|tema/ })
      .or(page.locator("button:has(svg)").filter({ hasText: /🌙|☀️|🌞/ }))
      .or(page.locator('[aria-label*="theme"]'))
      .or(page.locator('[title*="theme"]'));

    if ((await themeButton.count()) > 0) {
      await themeButton.first().click();
      await page.waitForTimeout(1000);
    }

    // Probar navegación después del cambio de tema
    const navigation = page.locator("nav");
    const navHeight = await navigation.evaluate(
      (el) => el.getBoundingClientRect().height
    );

    const skillsButton = page
      .locator("nav button")
      .filter({ hasText: /skills|habilidades/i });
    await skillsButton.click();
    await page.waitForTimeout(2000);

    const skillsTitle = page.locator("#skills h2").first();
    await expect(skillsTitle).toBeVisible();

    const titleBounds = await skillsTitle.boundingBox();
    if (titleBounds) {
      const expectedMinY = navHeight + 10;
      expect(titleBounds.y).toBeGreaterThanOrEqual(expectedMinY);
      console.log(`🌙 ✅ Tema oscuro: Navegación funcionando correctamente`);
    }
  });

  test("debería generar un reporte visual de la mejora", async ({ page }) => {
    // Scroll al top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Tomar screenshot inicial
    await page.screenshot({
      path: "test-results/navigation-offset-solution-hero.png",
      clip: { x: 0, y: 0, width: 1280, height: 400 },
    });

    // Navegar a cada sección y tomar screenshots
    const sections = [
      { name: "experience", button: /experience|experiencia/i },
      { name: "projects", button: /projects|proyectos/i },
      { name: "skills", button: /skills|habilidades/i },
      { name: "education", button: /education|educación/i },
    ];

    for (const section of sections) {
      const navButton = page
        .locator("nav button")
        .filter({ hasText: section.button });
      await navButton.click();
      await page.waitForTimeout(2000);

      // Screenshot de la sección con el header visible
      await page.screenshot({
        path: `test-results/navigation-offset-solution-${section.name}.png`,
        clip: { x: 0, y: 0, width: 1280, height: 500 },
      });

      console.log(`📸 Screenshot capturado para ${section.name}`);
    }

    console.log("📷 ✅ Reporte visual generado exitosamente");
  });
});
