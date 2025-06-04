import { test, expect } from "@playwright/test";

test.describe("Navegación - Verificación de Solución", () => {
  test("debería verificar que los títulos están correctamente posicionados después del fix", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector("#hero", { timeout: 10000 });
    await page.waitForTimeout(3000); // Dar tiempo para animaciones

    // Probar navegación a Experience
    console.log("🧪 Probando navegación a Experience...");

    // Buscar el botón de Experience en la navegación
    const experienceButton = page
      .locator("nav button")
      .filter({ hasText: /experience/i });
    await experienceButton.click();

    // Esperar a que termine el scroll
    await page.waitForTimeout(2000);

    // Obtener la altura de la navegación
    const navHeight = await page
      .locator("nav")
      .evaluate((el) => el.getBoundingClientRect().height);
    console.log("📏 Altura de navegación:", navHeight);

    // Obtener posición del título
    const experienceTitle = page.locator("#experience h2").first();
    await expect(experienceTitle).toBeVisible();

    const titleBounds = await experienceTitle.boundingBox();
    if (titleBounds) {
      console.log("📍 Posición Y del título Experience:", titleBounds.y);

      // Verificar que el título está por debajo de la navegación
      const margin = titleBounds.y - navHeight;
      console.log("📐 Margen con navegación:", margin);

      if (margin >= 10) {
        console.log("✅ SUCCESS: El título está correctamente posicionado!");
        console.log(`   Margen: ${margin}px (≥ 10px requerido)`);
      } else {
        console.log("❌ FAIL: El título aún está muy cerca de la navegación");
        console.log(`   Margen: ${margin}px (< 10px requerido)`);
      }

      // Test assertion
      expect(titleBounds.y).toBeGreaterThan(navHeight + 5);
    }

    // Tomar screenshot para evidencia visual
    await page.screenshot({
      path: "test-results/navigation-fix-verification.png",
      clip: { x: 0, y: 0, width: 1280, height: 600 },
    });

    console.log(
      "📸 Screenshot guardado en test-results/navigation-fix-verification.png"
    );
  });
});
