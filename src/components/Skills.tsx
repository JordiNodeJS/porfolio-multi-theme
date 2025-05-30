import React from "react";
import { motion } from "framer-motion";
import { usePortfolioDataFromLocales } from "../hooks/usePortfolioDataFromLocales";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";
import { useTheme } from "../hooks/useTheme";
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
  SiGithub,
  SiJenkins,
  SiScrumalliance,
  SiTestinglibrary,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import Skill3DCard from "./Skill3DCard";
import {
  getLevelNameForTechStack,
  getDescriptionForTech,
  getSkillLevelText,
} from "./SkillsHelper";

const SkillBar = ({
  skill,
  index,
}: {
  skill: { name: string; level: number };
  index: number;
}) => {
  const { theme } = useTheme();

  const getSkillColor = (level: number) => {
    // Colores para el tema vintage
    if (theme === "vintage") {
      if (level >= 85)
        return { gradient: "from-amber-600 to-amber-800", bg: "bg-amber-700" };
      if (level >= 65)
        return { gradient: "from-teal-600 to-teal-800", bg: "bg-teal-700" };
      if (level >= 40)
        return { gradient: "from-rose-600 to-rose-800", bg: "bg-rose-700" };
      if (level === 75)
        return {
          gradient: "from-violet-600 to-violet-800",
          bg: "bg-violet-700",
        };
      return {
        gradient: "from-emerald-600 to-emerald-800",
        bg: "bg-emerald-700",
      };
    }

    // Colores para el tema retro-pastel
    if (theme === "retro-pastel") {
      if (level >= 85)
        return { gradient: "from-amber-300 to-amber-500", bg: "bg-amber-400" };
      if (level >= 65)
        return { gradient: "from-cyan-300 to-cyan-500", bg: "bg-cyan-400" };
      if (level >= 40)
        return { gradient: "from-pink-300 to-pink-500", bg: "bg-pink-400" };
      if (level === 75)
        return {
          gradient: "from-purple-300 to-purple-500",
          bg: "bg-purple-400",
        };
      return { gradient: "from-green-300 to-green-500", bg: "bg-green-400" };
    }

    // Colores para el tema brutalism
    if (theme === "brutalism") {
      if (level >= 85)
        return {
          gradient: "from-yellow-400 to-yellow-600",
          bg: "bg-yellow-500",
        };
      if (level >= 65)
        return { gradient: "from-cyan-400 to-cyan-600", bg: "bg-cyan-500" };
      if (level >= 40)
        return { gradient: "from-pink-400 to-pink-600", bg: "bg-pink-500" };
      if (level === 75)
        return {
          gradient: "from-purple-400 to-purple-600",
          bg: "bg-purple-500",
        };
      return { gradient: "from-green-400 to-green-600", bg: "bg-green-500" };
    }

    // Colores para los temas claro/oscuro por defecto
    if (theme === "light") {
      if (level >= 85)
        return { gradient: "from-blue-500 to-blue-700", bg: "bg-blue-600" };
      if (level >= 65)
        return {
          gradient: "from-emerald-500 to-emerald-700",
          bg: "bg-emerald-600",
        };
      if (level >= 40)
        return { gradient: "from-amber-500 to-amber-700", bg: "bg-amber-600" };
      if (level === 75)
        return {
          gradient: "from-indigo-500 to-indigo-700",
          bg: "bg-indigo-600",
        };
      return { gradient: "from-green-500 to-green-700", bg: "bg-green-600" };
    }

    // Tema oscuro por defecto
    if (level >= 85)
      return { gradient: "from-blue-400 to-blue-600", bg: "bg-blue-500" };
    if (level >= 65)
      return {
        gradient: "from-emerald-400 to-emerald-600",
        bg: "bg-emerald-500",
      };
    if (level >= 40)
      return { gradient: "from-amber-400 to-amber-600", bg: "bg-amber-500" };
    if (level === 75)
      return { gradient: "from-indigo-400 to-indigo-600", bg: "bg-indigo-500" };
    return { gradient: "from-green-400 to-green-600", bg: "bg-green-500" };
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
        <motion.span
          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 ${
            getSkillColor(skill.level).bg
          } ${
            theme === "brutalism"
              ? "text-black border-2 border-black"
              : theme === "retro-pastel"
              ? "text-gray-900 border border-white/30"
              : theme === "vintage"
              ? "text-white border border-amber-900/30"
              : theme === "light"
              ? "text-white border border-white/30"
              : "text-white border border-white/30"
          }`}
          style={{
            fontFamily:
              theme === "brutalism" ? "'Courier New', monospace" : "inherit",
            letterSpacing: theme === "brutalism" ? "1px" : "0.5px",
            boxShadow:
              theme === "brutalism" ? "2px 2px 0 rgba(0,0,0,0.2)" : "none",
            transform: theme === "brutalism" ? "skew(-10deg)" : "none",
            display: "inline-block",
            borderRadius: theme === "brutalism" ? "0" : "0.375rem",
          }}
          whileHover={{
            scale: theme === "brutalism" ? 1.05 : 1.02,
            boxShadow:
              theme === "brutalism"
                ? "3px 3px 0 rgba(0,0,0,0.3)"
                : theme === "retro-pastel" || theme === "vintage"
                ? "0 4px 12px -2px rgba(0,0,0,0.1)"
                : "0 4px 12px -2px rgba(255,255,255,0.1)",
            transition: { duration: 0.2 },
          }}
        >
          {getSkillLevelText(skill.level)}
        </motion.span>
      </div>
      <div className="w-full bg-gray-200/80 dark:bg-gray-700/80 h-4 overflow-hidden border-2 border-gray-400 dark:border-gray-600 relative">
        <div
          className="absolute inset-0 bg-gray-300/30 dark:bg-gray-800/30"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)",
            backgroundSize: "10px 10px",
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${
            getSkillColor(skill.level).gradient
          } relative`}
          style={{
            boxShadow: "none",
            borderRight: "2px solid rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.4)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { skills: skillsDataFromHook } = usePortfolioDataFromLocales();
  const { skills: skillsTranslations } = usePortfolioTranslations();
  const { theme } = useTheme();

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
          <h2
            className={`text-4xl md:text-5xl mb-8 ${
              theme === "brutalism"
                ? "brutal-title"
                : theme === "vintage"
                ? "font-sans font-bold text-amber-800 border-b-2 border-amber-700/60 pb-2 tracking-wide"
                : theme === "retro-pastel"
                ? "font-medium text-pink-600 text-shadow"
                : "font-bold text-gray-800 dark:text-gray-100"
            }`}
            style={{
              textShadow:
                theme === "vintage"
                  ? "1px 1px 0 rgba(120, 53, 15, 0.3)"
                  : theme === "retro-pastel"
                  ? "2px 2px 0 rgba(255, 182, 193, 0.4)"
                  : theme === "brutalism"
                  ? undefined
                  : "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
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
            className="glass-effect p-6 rounded-xl border-t-4 border-t-primary-500/50 dark:border-t-primary-400/50"
          >
            <h3
              className={`text-2xl mb-8 ${
                theme === "brutalism"
                  ? "font-black uppercase border-b-4 border-black dark:border-white pb-2"
                  : theme === "vintage"
                  ? "font-sans font-bold text-amber-700 border-b-2 border-amber-600/50 pb-2"
                  : theme === "retro-pastel"
                  ? "font-medium text-pink-500 border-b border-pink-300 pb-2"
                  : "font-bold text-gray-800 dark:text-gray-100 border-b pb-2 border-primary-500/30 dark:border-primary-400/30"
              }`}
            >
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

          {/* Tech Stack with 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-6 rounded-xl border-t-4 border-t-purple-500/50 dark:border-t-purple-400/50"
          >
            <h3
              className={`text-2xl mb-8 ${
                theme === "brutalism"
                  ? "font-black uppercase border-b-4 border-black dark:border-white pb-2"
                  : theme === "vintage"
                  ? "font-sans font-bold text-purple-800 border-b-2 border-purple-700/50 pb-2"
                  : theme === "retro-pastel"
                  ? "font-medium text-purple-500 border-b border-purple-300 pb-2"
                  : "font-bold text-gray-800 dark:text-gray-100 border-b pb-2 border-purple-500/30 dark:border-purple-400/30"
              }`}
            >
              {skillsTranslations.techStack}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={tech.name === "Redux" ? "sm:col-start-2" : ""}
                >
                  <Skill3DCard
                    icon={tech.icon}
                    name={tech.name}
                    level={getLevelNameForTechStack(tech.name)}
                    color={tech.color}
                    description={getDescriptionForTech(tech.name)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Methodologies & Tools - Ahora adaptativo por tema */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`p-6 max-w-4xl mx-auto ${
            theme === "brutalism"
              ? "bg-white dark:bg-black border-4 border-black dark:border-white font-sans"
              : theme === "vintage"
              ? "glass-effect rounded-xl border-t-4 border-t-amber-500/50"
              : theme === "retro-pastel"
              ? "glass-effect rounded-xl border-t-4 border-t-pink-400/50"
              : "glass-effect rounded-xl border-t-4 border-t-primary-500/50 dark:border-t-primary-400/50"
          }`}
          style={{
            boxShadow:
              theme === "brutalism" ? "8px 8px 0 0 #000000" : undefined,
            fontFamily:
              theme === "brutalism"
                ? '"Inter", system-ui, sans-serif'
                : undefined,
          }}
        >
          <h3
            className={`text-3xl mb-8 pb-2 ${
              theme === "brutalism"
                ? "font-black uppercase border-b-4 border-black dark:border-white tracking-wider"
                : theme === "vintage"
                ? "font-serif font-bold text-amber-700 border-b-2 border-amber-600/50"
                : theme === "retro-pastel"
                ? "font-medium text-pink-500 border-b border-pink-300"
                : "font-bold text-gray-800 dark:text-gray-100 border-b-2 border-primary-500/30 dark:border-primary-400/30"
            }`}
            style={{
              fontFamily:
                theme === "vintage"
                  ? '"Inter", system-ui, sans-serif'
                  : undefined,
              letterSpacing:
                theme === "brutalism"
                  ? "2px"
                  : theme === "vintage"
                  ? "1px"
                  : theme === "retro-pastel"
                  ? "0.5px"
                  : "0.5px",
            }}
          >
            {skillsTranslations.methodologies}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Agile/SCRUM",
                color: "bg-yellow-400",
                icon: <SiScrumalliance className="w-8 h-8 text-black" />,
                description: "Metodologías ágiles y gestión de proyectos",
              },
              {
                name: "Git/GitHub",
                color: "bg-cyan-400",
                icon: <SiGithub className="w-8 h-8 text-black" />,
                description: "Control de versiones y colaboración",
              },
              {
                name: "Testing",
                color: "bg-pink-400",
                icon: <SiTestinglibrary className="w-8 h-8 text-black" />,
                description: "Pruebas unitarias y de integración",
              },
              {
                name: "CI/CD",
                color: "bg-green-400",
                icon: <SiJenkins className="w-8 h-8 text-black" />,
                description: "Integración y despliegue continuo",
              },
            ].map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{
                  y: theme === "brutalism" ? -8 : -4,
                  boxShadow:
                    theme === "brutalism" ? "4px 4px 0 0 #000000" : undefined,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
                className={`relative p-4 group ${
                  theme === "brutalism"
                    ? `border-2 border-black dark:border-white ${method.color}`
                    : theme === "vintage"
                    ? "glass-effect bg-amber-50/80 border border-amber-200 rounded-lg"
                    : theme === "retro-pastel"
                    ? "glass-effect bg-pink-50/80 border border-pink-200 rounded-lg"
                    : "glass-effect bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg"
                }`}
                style={{
                  boxShadow:
                    theme === "brutalism" ? "4px 4px 0 0 #000000" : undefined,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`absolute inset-0 ${
                    theme === "brutalism"
                      ? "bg-white/20 group-hover:bg-black/10"
                      : "bg-gradient-to-br from-transparent to-black/5 group-hover:to-black/10"
                  } transition-colors`}
                ></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center mb-3 ${
                      theme === "brutalism"
                        ? `border-2 border-black dark:border-white ${method.color} group-hover:bg-opacity-90`
                        : theme === "vintage"
                        ? "bg-amber-100 border border-amber-300 rounded-lg"
                        : theme === "retro-pastel"
                        ? "bg-pink-100 border border-pink-300 rounded-lg"
                        : "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg"
                    } transition-all`}
                  >
                    {React.cloneElement(method.icon, {
                      className: `w-8 h-8 ${
                        theme === "brutalism"
                          ? "text-black"
                          : theme === "vintage"
                          ? "text-amber-700"
                          : theme === "retro-pastel"
                          ? "text-pink-600"
                          : "text-primary-600 dark:text-primary-400"
                      }`,
                    })}
                  </div>
                  <p
                    className={`text-sm text-center mt-2 ${
                      theme === "brutalism"
                        ? "text-black font-bold uppercase tracking-wider"
                        : theme === "vintage"
                        ? "text-amber-800 font-medium"
                        : theme === "retro-pastel"
                        ? "text-pink-700 font-medium"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {method.description}
                  </p>
                  <span
                    className={`text-center text-base mt-1 ${
                      theme === "brutalism"
                        ? "text-black font-extrabold uppercase tracking-widest"
                        : theme === "vintage"
                        ? "text-amber-900 font-bold"
                        : theme === "retro-pastel"
                        ? "text-pink-800 font-semibold"
                        : "text-gray-800 dark:text-gray-100 font-semibold"
                    }`}
                  >
                    {method.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={`mt-8 pt-5 ${
              theme === "brutalism"
                ? "border-t-4 border-black"
                : theme === "vintage"
                ? "border-t-2 border-amber-300"
                : theme === "retro-pastel"
                ? "border-t-2 border-pink-300"
                : "border-t-2 border-primary-300/30 dark:border-primary-400/30"
            }`}
          >
            <p
              className={`text-lg text-center ${
                theme === "brutalism"
                  ? "text-black font-black uppercase tracking-widest"
                  : theme === "vintage"
                  ? "text-amber-800 font-bold"
                  : theme === "retro-pastel"
                  ? "text-pink-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300 font-semibold"
              }`}
              style={{
                letterSpacing: theme === "brutalism" ? "3px" : "1px",
              }}
            >
              {theme === "brutalism"
                ? "MÉTODOS EFICIENTES, RESULTADOS EXCEPCIONALES"
                : skillsTranslations.methodologies &&
                  skillsTranslations.methodologies.includes("Metodologías")
                ? "Metodologías eficientes para resultados excepcionales"
                : "Efficient methodologies for exceptional results"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
