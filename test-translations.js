// Script simple para verificar que las traducciones funcionan
import i18n from "./src/i18n/index.ts";

// Test básico de traducciones
const testTranslations = async () => {
  await i18n.init();

  console.log("🔍 Testing Spanish translations:");

  // Cambiar a español
  await i18n.changeLanguage("es");

  console.log("Skills title:", i18n.t("skills.title"));
  console.log("Skills competenceLevel:", i18n.t("skills.competenceLevel"));
  console.log("Skills techStack:", i18n.t("skills.techStack"));
  console.log("Skills methodologies:", i18n.t("skills.methodologies"));

  console.log("\n🔍 Testing English translations:");

  // Cambiar a inglés
  await i18n.changeLanguage("en");

  console.log("Skills title:", i18n.t("skills.title"));
  console.log("Skills competenceLevel:", i18n.t("skills.competenceLevel"));
  console.log("Skills techStack:", i18n.t("skills.techStack"));
  console.log("Skills methodologies:", i18n.t("skills.methodologies"));
};

testTranslations().catch(console.error);
