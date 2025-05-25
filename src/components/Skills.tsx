import { motion } from "framer-motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";
import { Code2, Palette, FileCode2, FileJson, Box, Cpu, Layers, Network, DatabaseZap } from "lucide-react";
import { NextJsIcon } from "./icons/NextJsIcon";
import type { LucideIcon } from "lucide-react";

const SkillBar = ({
  skill,
  index,
}: {
  skill: { name: string; level: number; };
  index: number;
}) => {
  const getSkillLevelText = (level: number): string => {
    if (level >= 85) return "Avanzado";
    if (level >= 65) return "Intermedio";
    if (level >= 40) return "Básico";
    if (level === 75) return "B2"; // Special case for language proficiency
    return "Intermedio";
  };

  const getSkillColor = (level: number) => {
    if (level >= 85) return "from-green-400 to-emerald-500";
    if (level >= 65) return "from-blue-400 to-blue-500";
    if (level >= 40) return "from-yellow-400 to-orange-500";
    if (level === 75) return "from-purple-400 to-purple-500";
    return "from-primary-400 to-primary-500";
  };

  const progress = skill.level; // Level is already a number

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      {" "}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>{" "}
        {/* Changed from nombre to name */}
        <span className="text-sm text-gray-400 capitalize">
          {getSkillLevelText(skill.level)}
        </span>{" "}
        {/* Changed from nivel to level */}
      </div>
      <div className="w-full dark:bg-gray-700 light:bg-gray-300 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${getSkillColor(
            skill.level // Changed from nivel to level
          )} rounded-full relative`}
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const TechIcon = ({
  icon: Icon,
  name,
  color,
}: {
  icon: LucideIcon;
  name: string;
  color: string;
}) => (
  <motion.div
    whileHover={{
      scale: 1.1,
      y: -5,
      rotate: [0, -1, 1, -1, 1, 0],
    }}
    transition={{
      duration: 0.3,
      rotate: { duration: 0.3, ease: "easeInOut" },
    }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center p-4 glass-effect rounded-xl dark:hover:bg-white/10 light:hover:bg-black/5 transition-all duration-300 group"
  >
    <div
      className={`p-3 rounded-lg bg-gradient-to-br ${color} mb-3 group-hover:shadow-lg transition-shadow`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
      {name}
    </span>
  </motion.div>
);

const Skills = () => {
  const { skills: skillsDataFromHook } = usePortfolioData(); // Renamed to avoid conflict
  const { skills: skillsTranslations } = usePortfolioTranslations(); // Renamed for clarity

  const techStack = [
    { icon: Code2, name: "React", color: "from-blue-400 to-blue-600" },
    { icon: FileCode2, name: "JavaScript", color: "from-yellow-400 to-yellow-600" },
    { icon: FileJson, name: "TypeScript", color: "from-blue-500 to-blue-700" },
    { icon: Palette, name: "CSS/SASS", color: "from-pink-400 to-pink-600" },
    { icon: Box, name: "Vite", color: "from-purple-400 to-purple-600" },
    { icon: Layers, name: "TailwindCSS", color: "from-teal-400 to-teal-600" },
    { icon: DatabaseZap, name: "SQL", color: "from-orange-400 to-orange-600" },
    { icon: Cpu, name: "NestJS", color: "from-red-400 to-red-600" },
    { icon: NextJsIcon, name: "Next.js", color: "from-gray-400 to-gray-600" },
    { icon: Network, name: "Redux", color: "from-purple-400 to-indigo-600" },
  ];

  if (!skillsDataFromHook || !skillsTranslations) {
    return <div>Loading skills data...</div>; // Or some other loading indicator
  }

  return (
    <section id="skills" className="section-padding section-bg-gradient">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {" "}
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {skillsTranslations.title} {/* Use translated title */}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {skillsTranslations.subtitle} {/* Use translated subtitle */}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {" "}
            <h3 className="text-2xl font-bold text-white mb-8">
              {skillsTranslations.competenceLevel}{" "}
              {/* Use translated competenceLevel */}
            </h3>
            <div className="space-y-4">
              {skillsDataFromHook.map((skill, index) => (
                <SkillBar
                  key={skill.id || index}
                  skill={{ name: skill.name, level: skill.level }}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {" "}
            <h3 className="text-2xl font-bold text-white mb-8">
              {skillsTranslations.techStack} {/* Use translated techStack */}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TechIcon {...tech} />
                </motion.div>
              ))}
            </div>
            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gray-800/50 dark:bg-opacity-50 light:bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <h4 className="text-xl font-semibold text-white mb-4">
                {skillsTranslations.methodologies}{" "}
                {/* Corrected: Use skillsTranslations */}
              </h4>
              <ul className="space-y-2">
                {[
                  "Agile/SCRUM",
                  "Git/GitHub",
                  "Testing (Jest/Vitest)",
                  "CI/CD",
                ].map((method) => (
                  <li key={method} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-3-3v6m6.364-9.364a9 9 0 10-12.728 12.728A9 9 0 0018.364 2.636z"
                      />
                    </svg>
                    <span className="text-gray-300">{method}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
