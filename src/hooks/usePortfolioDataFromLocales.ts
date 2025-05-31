import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { DatabaseData, Skill, Education as EducationType } from "../types";

type RawSkill = {
  id: string;
  nombre: string;
  nivel: string;
  category: string;
  description: string;
};

// Helper function to convert skill level to numeric value
const getLevelValue = (levelStr: string): number => {
  switch (levelStr.toLowerCase()) {
    case "avanzado":
    case "advanced":
      return 90;
    case "intermedio":
    case "intermediate":
      return 70;
    case "básico":
    case "basic":
      return 50;
    case "b2":
      return 75;
    case "b1":
      return 60;
    default:
      return 60;
  }
};

export const usePortfolioDataFromLocales = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<DatabaseData | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [education, setEducation] = useState<EducationType[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get presentation data from translations
        const presentationData = {
          presentation: {
            name: t("presentation.name"),
            title: t("presentation.title"),
            description: t("presentation.description"),
          },
        };

        setData(presentationData as unknown as DatabaseData);

        // Get skills data from translations
        const skillsFromTranslations = t("skillsData", {
          returnObjects: true,
        }) as RawSkill[];

        if (Array.isArray(skillsFromTranslations)) {
          const transformedSkills = skillsFromTranslations.map((skill) => ({
            id: skill.id,
            name: skill.nombre,
            level: getLevelValue(skill.nivel),
            category: skill.category as Skill["category"],
            description: skill.description,
          }));

          setSkills(transformedSkills);
        }

        // Get education data from translations
        const educationFromTranslations = t("educationData", {
          returnObjects: true,
        }) as EducationType[];

        if (Array.isArray(educationFromTranslations)) {
          setEducation(educationFromTranslations);
        }
      } catch (error) {
        console.error("Error loading portfolio data from locales:", error);
      }
    };

    loadData();
  }, [i18n.language, t]);

  return {
    data,
    skills,
    education,
  };
};

export default usePortfolioDataFromLocales;
