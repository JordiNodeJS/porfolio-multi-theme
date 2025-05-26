// Helper functions for the Skills component

// Helper function to determine skill level for tech stack items
export const getLevelNameForTechStack = (
  techName: string
): "beginner" | "intermediate" | "advanced" | "expert" => {
  // Map tech names to appropriate skill levels
  const advancedTechs: string[] = [
    "React",
    "JavaScript",
    "CSS/SASS",
    "TailwindCSS",
  ];
  const intermediateTechs: string[] = [
    "TypeScript",
    "Next.js",
    "Redux",
    "Vite",
  ];
  const expertTechs: string[] = []; // You can add any techs you consider expert level

  if (expertTechs.includes(techName)) return "expert";
  if (advancedTechs.includes(techName)) return "advanced";
  if (intermediateTechs.includes(techName)) return "intermediate";
  return "beginner";
};

// Helper function to provide descriptions for tech stack items
export const getDescriptionForTech = (techName: string): string => {
  const descriptions: Record<string, string> = {
    React:
      "Component-based UI library for building interactive web applications",
    JavaScript: "Core programming language for web development",
    TypeScript: "Strongly typed programming language that builds on JavaScript",
    "CSS/SASS": "Advanced styling with CSS preprocessor capabilities",
    TailwindCSS: "Utility-first CSS framework for rapid UI development",
    Vite: "Next generation front-end build tool",
    SQL: "Language for managing and querying relational databases",
    NestJS: "Progressive Node.js framework for server-side applications",
    "Next.js": "React framework for production grade applications",
    Redux: "Predictable state management container for JavaScript apps",
  };

  return descriptions[techName] || `${techName} development and implementation`;
};

// Helper function to get English equivalent of skill levels
export const getSkillLevelText = (level: number): string => {
  if (level === 75) return "B2";
  if (level === 60) return "B1"; // Nivel de inglés B1
  if (level >= 85) return "Advanced";
  if (level >= 65) return "Intermediate";
  if (level >= 40) return "Basic";
  return "Intermediate";
};
