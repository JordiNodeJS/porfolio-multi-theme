import { useTranslation } from "react-i18next";

export const usePortfolioTranslations = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  // Helper para navigation
  const navigation = {
    home: t("navigation.home"),
    experience: t("navigation.experience"),
    projects: t("navigation.projects"),
    skills: t("navigation.skills"),
    education: t("navigation.education"),
    contact: t("navigation.contact"),
  };
  // Helper para hero section
  const hero = {
    greeting: t("hero.greeting"),
    name: t("hero.name"),
    title: t("hero.title"),
    subtitle: t("hero.subtitle"),
    cta: t("hero.cta"),
    downloadCV: t("hero.downloadCV"),
    viewProjects: t("hero.viewProjects"),
  };

  // Helper para experience section
  const experience = {
    title: t("experience.title"),
    subtitle: t("experience.subtitle"),
    location: t("experience.location"),
    viewProject: t("experience.viewProject"),
    clickTooltip: t("experience.clickTooltip"),
    technologiesUsed: t("experience.technologiesUsed"),
    achievements: t("experience.achievements"),
    description: t("experience.description"),
    impact: t("experience.impact"),
    period: t("experience.period"),
    technologiesAndMethodologies: t("experience.technologiesAndMethodologies"),
    frontend: t("experience.frontend"),
    testing: t("experience.testing"),
    methodologies: t("experience.methodologies"),
    tools: t("experience.tools"),
    featuredProjects: t("experience.featuredProjects"),
  };
  // Helper para projects section
  const projects = {
    title: t("projects.title"),
    subtitle: t("projects.subtitle"),
    viewProject: t("projects.viewProject"),
    viewCode: t("projects.viewCode"),
    technologies: t("projects.technologies"),
    features: t("projects.features"),
    liveDemo: t("projects.liveDemo"),
    sourceCode: t("projects.sourceCode"),
    viewMore: t("projects.viewMore"),
  }; // Helper para skills section
  const skills = {
    title: t("skills.title"),
    subtitle: t("skills.subtitle"),
    competenceLevel: t("skills.competenceLevel"),
    techStack: t("skills.techStack"),
    methodologies: t("skills.methodologies"),
    categories: {
      frontend: t("skills.categories.frontend"),
      backend: t("skills.categories.backend"),
      tools: t("skills.categories.tools"),
      databases: t("skills.categories.databases"),
    },
  };
  // Helper para education section
  const education = {
    title: t("education.title"),
    subtitle: t("education.subtitle"),
    degree: t("education.degree"),
    institution: t("education.institution"),
    period: t("education.period"),
    description: t("education.description"),
    skills: t("education.skills"),
    certificate: t("education.certificate"),
    viewCertificate: t("education.viewCertificate"),
    featured: t("education.featured"),
    stats: {
      trainings: t("education.stats.trainings"),
      technologies: t("education.stats.technologies"),
      projects: t("education.stats.projects"),
    },
    learningPhilosophy: {
      title: t("education.learningPhilosophy.title"),
      description: t("education.learningPhilosophy.description"),
    },
  };

  // Helper para contact section
  const contact = {
    title: t("contact.title"),
    subtitle: t("contact.subtitle"),
    name: t("contact.name"),
    email: t("contact.email"),
    message: t("contact.message"),
    send: t("contact.send"),
    sending: t("contact.sending"),
    success: t("contact.success"),
    error: t("contact.error"),
    social: t("contact.social"),
    location: t("contact.location"),
    phone: t("contact.phone"),
    availability: t("contact.availability"),
  };
  // Helper para footer
  const footer = {
    rights: t("footer.rights"),
    madeWith: t("footer.madeWith"),
    and: t("footer.and"),
    by: t("footer.by"),
    techStack: t("footer.techStack"),
    connectWithMe: t("footer.connectWithMe"),
    description: t("footer.description"),
    designedWith: t("footer.designedWith"),
  };

  // Helper para theme y language
  const ui = {
    theme: {
      toggle: t("theme.toggle"),
      light: t("theme.light"),
      dark: t("theme.dark"),
    },
    language: {
      select: t("language.select"),
      es: t("language.es"),
      en: t("language.en"),
      fr: t("language.fr"),
      de: t("language.de"),
      it: t("language.it"),
      pt: t("language.pt"),
    },
    loading: {
      text: t("loading.text"),
    },
  };

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    navigation,
    hero,
    experience,
    projects,
    skills,
    education,
    contact,
    footer,
    ui,
  };
};

export default usePortfolioTranslations;
