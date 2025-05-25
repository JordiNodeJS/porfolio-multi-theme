import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { DatabaseData, Skill } from "../types";

// Import raw data directly
import dbDataJson from "../db/db.json";
import skillsDataJson from "../db/skills.json";

export const usePortfolioData = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<DatabaseData | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setData(dbDataJson as unknown as DatabaseData);
        setSkills(skillsDataJson as unknown as Skill[]);
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
