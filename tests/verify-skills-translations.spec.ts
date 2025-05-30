import { test, expect } from "@playwright/test";

test("Verify Skills translations are working correctly", async ({ page }) => {
  // Navegar a la página principal
  await page.goto("http://localhost:5173");

  // Esperar a que la página cargue
  await page.waitForLoadState("networkidle");

  // Navegar a la sección skills
  await page.goto("http://localhost:5173/#skills");
  await page.waitForTimeout(1000);

  // Verificar que los títulos de skills están traduciéndose correctamente (no son claves raw)
  console.log("🔍 Checking Skills section translations...");

  // Buscar elementos que contengan los textos traducidos
  const skillsTitle = page
    .locator("h2")
    .filter({ hasText: "Habilidades Técnicas" });
  const competenceLevel = page
    .locator("h3")
    .filter({ hasText: "Nivel de Competencia" });
  const techStack = page.locator("h3").filter({ hasText: "Stack Tecnológico" });
  const methodologies = page
    .locator("h3")
    .filter({ hasText: "Metodologías y Herramientas" });

  // Verificar que estos elementos existen (las traducciones funcionan)
  await expect(skillsTitle).toBeVisible();
  console.log('✅ Skills title translation working: "Habilidades Técnicas"');

  await expect(competenceLevel).toBeVisible();
  console.log(
    '✅ Competence level translation working: "Nivel de Competencia"'
  );

  await expect(techStack).toBeVisible();
  console.log('✅ Tech stack translation working: "Stack Tecnológico"');

  await expect(methodologies).toBeVisible();
  console.log(
    '✅ Methodologies translation working: "Metodologías y Herramientas"'
  );

  // Verificar que NO aparecen las claves raw
  const rawKeys = [
    "skills.title",
    "skills.competenceLevel",
    "skills.techStack",
    "skills.methodologies",
  ];

  for (const rawKey of rawKeys) {
    const rawKeyElement = page.locator(`text=${rawKey}`);
    await expect(rawKeyElement).not.toBeVisible();
    console.log(
      `✅ Raw key "${rawKey}" is NOT visible - translation working correctly`
    );
  }

  console.log("🎉 All Skills translations are working correctly!");
});
