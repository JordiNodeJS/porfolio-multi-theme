import { useState, useEffect } from "react";
import {
  type DatabaseData,
  type Skill,
  type Experience,
  type Education,
  type Project,
} from "../types";

import dbData from "../db/db.json";
import skillsData from "../db/skills.json";
import experienceData from "../db/experience.json";
import educationData from "../db/education.json";
import projectsData from "../db/projects.json";

export const usePortfolioData = () => {
  const [data, setData] = useState<DatabaseData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setData(dbData as DatabaseData);
      setSkills(skillsData as Skill[]);      setExperience(experienceData as Experience[]);
      setEducation(educationData as Education[]);
      setProjects(projectsData as Project[]);
    } catch (error) {
      console.error("Error loading portfolio data:", error);
    } finally {
      setLoading(false);
    }
  }, []);  return {
    data,
    skills,
    experience,
    education,
    projects,
    loading,
  };
};
