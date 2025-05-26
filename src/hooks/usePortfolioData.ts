import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { DatabaseData, Skill } from "../types";

// Import raw data directly
import dbDataJson from "../db/db.json";
import skillsDataJson from "../db/skills.json";

type RawSkill = {
  nombre: string;
  nivel: string;
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
      return 60; // Valor numérico para B1
    default:
      return 60;
  }
};

// Helper function to determine category based on skill name
const getCategoryForSkill = (skillName: string): Skill["category"] => {
  skillName = skillName.toLowerCase();
  
  if (["react", "javascript", "html", "css", "sass", "tailwind"].some(tech => skillName.includes(tech))) {
    return "frontend";
  } else if (["node", "express", "php"].some(tech => skillName.includes(tech))) {
    return "backend";
  } else if (["sql", "mongo", "database"].some(tech => skillName.includes(tech))) {
    return "database";
  } else if (["git", "docker"].some(tech => skillName.includes(tech))) {
    return "devops";
  } else if (["inglés", "english"].some(lang => skillName.includes(lang))) {
    return "other";
  } else {
    return "tools";
  }
};

export const usePortfolioData = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<DatabaseData | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setData(dbDataJson as unknown as DatabaseData);
        
        // Transform skills data from Spanish format to English format
        const transformedSkills = (skillsDataJson as unknown as RawSkill[]).map((skill, index) => ({
          id: index.toString(),
          name: skill.nombre,
          level: getLevelValue(skill.nivel), // Convert to numeric value
          category: getCategoryForSkill(skill.nombre), // Add category based on skill name
          description: "", // Add empty description
        }));
        
        setSkills(transformedSkills);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      }
    };

    loadData();
  }, [i18n.language]);

  return {
    data,
    skills,
  };
};

export default usePortfolioData;
