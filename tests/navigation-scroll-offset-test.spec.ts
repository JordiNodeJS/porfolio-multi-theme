import { test, expect } from "@playwright/test";

test.describe("Navegación - Problema de Offset", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Esperar a que la página cargue completamente
    await page.waitForSelector("#hero", { timeout: 10000 });
  });

  test("debería verificar que los títulos de sección se ocultan parcialmente tras la navegación fija", async ({
    page,
  }) => {
    // Esperar a que la navegación esté visible
    await page.waitForSelector("nav", { timeout: 5000 });

    // Obtener la altura de la navegación
    const navigation = page.locator("nav");
    const navHeight = await navigation.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    console.log("Altura de navegación:", navHeight);

    // Hacer clic en "Experience" desde la navegación
    await page.click(
      'nav button:has-text("Experiencia"), nav button:has-text("Experience")'
    );

    // Esperar a que el scroll termine
    await page.waitForTimeout(1000);

    // Verificar la posición del título de la sección Experience
    const experienceTitle = page.locator("#experience h2").first();
    await expect(experienceTitle).toBeVisible();

    const titleBounds = await experienceTitle.boundingBox();
    if (titleBounds) {
      console.log("Posición Y del título Experience:", titleBounds.y);
      console.log("Altura de navegación:", navHeight);

      // El problema: el título debería estar por debajo de la navegación
      // Si titleBounds.y < navHeight, significa que está oculto parcialmente
      if (titleBounds.y < navHeight) {
        console.log(
          "❌ PROBLEMA DETECTADO: El título está oculto parcialmente detrás de la navegación"
        );
        console.log(
          `Título en Y: ${titleBounds.y}, Navegación altura: ${navHeight}`
        );
        console.log(`Offset necesario: ${navHeight - titleBounds.y}px`);
      }
    }

    // Probar con otras secciones
    const sectionsToTest = [
      { navText: "Proyectos", selector: "#projects h2" },
      { navText: "Habilidades", selector: "#skills h2" },
      { navText: "Educación", selector: "#education h2" },
    ];

    for (const section of sectionsToTest) {
      // Hacer clic en la sección
      await page.click(
        `nav button:has-text("${
          section.navText
        }"), nav button[href*="${section.selector
          .replace("#", "")
          .replace(" h2", "")}"]`
      );
      await page.waitForTimeout(1000);

      const sectionTitle = page.locator(section.selector).first();
      if (await sectionTitle.isVisible()) {
        const bounds = await sectionTitle.boundingBox();
        if (bounds && bounds.y < navHeight) {
          console.log(
            `❌ ${section.navText}: Título oculto parcialmente (Y: ${bounds.y}, Nav: ${navHeight})`
          );
        }
      }
    }
  });

  test("debería mostrar el offset visual necesario para cada sección", async ({
    page,
  }) => {
    // Tomar screenshot inicial
    await page.screenshot({
      path: "test-results/navigation-offset-before.png",
      fullPage: true,
    });

    const navigation = page.locator("nav");
    const navHeight = await navigation.evaluate(
      (el) => el.getBoundingClientRect().height
    );

    // Probar navegación a cada sección y medir el offset
    const sections = ["#experience", "#projects", "#skills", "#education"];

    for (const sectionId of sections) {
      // Navegar usando JavaScript directo (simulando el comportamiento actual)
      await page.evaluate((id) => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, sectionId);

      await page.waitForTimeout(1500);

      // Medir posición del título
      const titleSelector = `${sectionId} h2`;
      const title = page.locator(titleSelector).first();

      if (await title.isVisible()) {
        const bounds = await title.boundingBox();
        if (bounds) {
          const offsetNeeded = Math.max(0, navHeight - bounds.y + 20); // 20px extra padding
          console.log(`Sección ${sectionId}:`);
          console.log(`  - Posición título: ${bounds.y}px`);
          console.log(`  - Altura navegación: ${navHeight}px`);
          console.log(`  - Offset necesario: ${offsetNeeded}px`);
        }
      }
    }
  });
});
