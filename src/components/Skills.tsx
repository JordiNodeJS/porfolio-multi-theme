import { motion } from "framer-motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiSass,
  SiVite,
  SiTailwindcss,
  SiNestjs,
  SiNextdotjs,
  SiRedux,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

const SkillBar = ({
  skill,
  index,
}: {
  skill: { name: string; level: number };
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
    if (level >= 85) return "from-green-500 to-emerald-600"; // Más intenso para mejorar contraste
    if (level >= 65) return "from-blue-500 to-blue-600"; // Más intenso para mejorar contraste
    if (level >= 40) return "from-amber-500 to-orange-600"; // Cambiado de yellow a amber para mejor contraste
    if (level === 75) return "from-purple-500 to-purple-600"; // Más intenso para mejorar contraste
    return "from-primary-500 to-primary-600"; // Más intenso para mejorar contraste
  };

  const progress = skill.level; // Level is already a number

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6 group"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {skill.name}
        </h3>
        <span className="text-sm text-gray-800 dark:text-gray-100 capitalize font-medium px-2 py-1 bg-gray-200/80 dark:bg-gray-700/80 rounded-full shadow-sm">
          {getSkillLevelText(skill.level)}
        </span>
      </div>
      <div className="w-full bg-gray-200/80 dark:bg-gray-700/80 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${getSkillColor(
            skill.level
          )} rounded-full relative shadow-sm group-hover:brightness-110 transition-all`}
        >
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/30 rounded-full"
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
  icon: IconType;
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
    className="flex flex-col items-center p-4 glass-effect rounded-xl border-t-2 border-t-primary-500/40 dark:border-t-primary-400/40 backdrop-blur-sm shadow-md hover:shadow-xl dark:hover:bg-white/10 light:hover:bg-black/5 transition-all duration-300 group"
  >
    <div
      className={`p-3 rounded-lg bg-gradient-to-br ${color} mb-3 group-hover:shadow-lg transition-shadow border border-white/20 dark:border-white/10`}
    >
      <Icon className="w-8 h-8 text-white drop-shadow-lg" />
    </div>
    <span className="text-sm text-gray-800 dark:text-gray-100 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
      {name}
    </span>
  </motion.div>
);

const Skills = () => {
  const { skills: skillsDataFromHook } = usePortfolioData();
  const { skills: skillsTranslations } = usePortfolioTranslations();

  const techStack = [
    { icon: SiReact, name: "React", color: "from-blue-500 to-blue-700" },
    {
      icon: SiJavascript,
      name: "JavaScript",
      color: "from-amber-400 to-amber-600",
    },
    {
      icon: SiTypescript,
      name: "TypeScript",
      color: "from-blue-600 to-blue-800",
    },
    { icon: SiSass, name: "CSS/SASS", color: "from-pink-500 to-pink-700" },
    { icon: SiVite, name: "Vite", color: "from-purple-500 to-purple-700" },
    {
      icon: SiTailwindcss,
      name: "TailwindCSS",
      color: "from-teal-500 to-teal-700",
    },
    { icon: TbSql, name: "SQL", color: "from-orange-500 to-orange-700" },
    { icon: SiNestjs, name: "NestJS", color: "from-red-500 to-red-700" },
    { icon: SiNextdotjs, name: "Next.js", color: "from-gray-600 to-gray-800" },
    { icon: SiRedux, name: "Redux", color: "from-purple-500 to-indigo-700" },
  ];

  if (!skillsDataFromHook || !skillsTranslations) {
    return <div>Loading skills data...</div>;
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 drop-shadow-md">
            {skillsTranslations.title}
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            {skillsTranslations.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-6 rounded-xl border-t-4 border-t-primary-500/50 dark:border-t-primary-400/50 shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 drop-shadow-sm border-b pb-2 border-primary-500/30 dark:border-primary-400/30">
              {skillsTranslations.competenceLevel}{" "}
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
            className="glass-effect p-6 rounded-xl border-t-4 border-t-purple-500/50 dark:border-t-purple-400/50 shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 drop-shadow-sm border-b pb-2 border-purple-500/30 dark:border-purple-400/30">
              {skillsTranslations.techStack}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={tech.name === "Redux" ? "sm:col-start-2" : ""}
                >
                  <TechIcon {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Methodologies & Tools - ahora como una sección independiente */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect p-6 rounded-xl border-t-4 border-t-primary-500/50 dark:border-t-primary-400/50 shadow-md max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 drop-shadow-sm border-b pb-2 border-primary-500/30 dark:border-primary-400/30">
            {skillsTranslations.methodologies}{" "}
          </h3>
          <div className="bg-gradient-to-br from-primary-600/30 to-purple-600/30 dark:from-primary-700/40 dark:to-purple-800/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-primary-500/30 dark:border-primary-400/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Agile/SCRUM",
                "Git/GitHub",
                "Testing (Jest/Vitest)",
                "CI/CD",
              ].map((method) => (
                <motion.div
                  key={method}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center group p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary-500/30 dark:bg-primary-400/30 rounded-full group-hover:bg-primary-500/50 dark:group-hover:bg-primary-300/40 transition-colors shadow-sm border border-primary-500/20 dark:border-primary-400/20 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-primary-700 dark:text-primary-300"
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
                  </div>
                  <span className="text-gray-800 dark:text-gray-100 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors text-center">
                    {method}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
