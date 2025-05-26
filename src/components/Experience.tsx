import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { ExperienceType } from "../types";

const ExperienceCard = ({
  experience,
  index,
  onCompanyClick,
}: {
  experience: ExperienceType;
  index: number;
  onCompanyClick?: (company: string, cardIndex: number) => void;
}) => {
  const { t } = useTranslation();
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isNodeHovered, setIsNodeHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCardHovered) {
      setShowTooltip(true);
      // Ocultar el tooltip después de 3 segundos
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    } else {
      setShowTooltip(false);
    }
    
    return () => clearTimeout(timer);
  }, [isCardHovered]);
  const isClickableCard =
    experience.company.includes("FLiPO") ||
    experience.company.includes("IT Academy") ||
    experience.company.includes("Aula Magna");

  const getCompanyName = () => {
    if (experience.company.includes("FLiPO")) return "FLiPO";
    if (experience.company.includes("IT Academy")) return "IT Academy";
    if (experience.company.includes("Aula Magna")) return "Aula Magna";
    return "";
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      } items-center mb-16 relative`}
    >
      {" "}
      {/* Content */}
      <div className="w-5/12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`glass-effect p-6 rounded-xl card-hover ${
            isClickableCard
              ? "cursor-pointer border border-primary-500/50 hover:border-primary-400 relative group"
              : ""
          }`}
          onClick={
            isClickableCard
              ? () => onCompanyClick?.(getCompanyName(), index)
              : undefined
          }
          title={isClickableCard ? "Haz clic para ver logros destacados" : ""}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          {" "}
          {/* Tooltip personalizado */}
          {isClickableCard && (
            <AnimatePresence>
              {showTooltip && (
                <motion.div 
                  className="absolute -top-12 glass-effect text-white text-xs px-3 py-2 rounded-lg pointer-events-none whitespace-nowrap z-10 border border-primary-500/30"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'max-content',
                    maxWidth: '90%'
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: 'spring',
                      damping: 20,
                      stiffness: 300
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 20, 
                    scale: 0.8,
                    x: '-50%',
                    transition: { 
                      duration: 0.3 
                    }
                  }}
                >
                  {t("experience.clickTooltip")}
                  <motion.div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current"
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      transition: { delay: 0.1 }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <h3 className="text-xl font-bold text-white mb-2 text-left">
            {experience.company}
          </h3>{" "}
          <div className="flex items-center gap-2 mb-4 text-primary-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{t("experience.location")}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 text-left">
            {experience.experience}
          </p>
          {/* Links */}
          {experience.links && (
            <div className="flex gap-2 flex-wrap justify-start">
              {experience.links.map((link: string, linkIndex: number) => (
                <motion.a
                  key={linkIndex}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {" "}
                  <ExternalLink className="w-3 h-3" />
                  {t("experience.viewProject")}
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      {/* Timeline Node */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.3,
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-20"
        >
          {/* Main timeline node */}{" "}
          <motion.div
            className="w-6 h-6 bg-primary-500 rounded-full border-4 dark:border-slate-900 border-white relative overflow-hidden shadow-lg shadow-primary-500/50"
            animate={
              isCardHovered || isNodeHovered
                ? { scale: 1.3, rotate: 180 }
                : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={() => setIsNodeHovered(true)}
            onMouseLeave={() => setIsNodeHovered(false)}
          >
            {/* Pulsing effect */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.9, 0.4, 0.9],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="absolute inset-0 bg-primary-400 rounded-full"
            />

            {/* Ripple effect */}
            <motion.div
              animate={{
                scale: [1, 3],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 1.5 + index * 0.3,
                ease: "easeOut",
              }}
              className="absolute inset-0 bg-primary-300 rounded-full"
            />

            {/* Inner glow */}
            <motion.div
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-1 bg-white rounded-full opacity-80"
            />
          </motion.div>
          {/* Connecting line to content */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "60px", opacity: 1 }}
            transition={{
              duration: 1,
              delay: index * 0.3 + 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 ${
              index % 2 === 0
                ? "right-6 bg-gradient-to-r from-primary-500 to-transparent"
                : "left-6 bg-gradient-to-l from-primary-500 to-transparent"
            }`}
          />
        </motion.div>
      </div>
      {/* Empty space for alternate layout */}
      <div className="w-5/12" />
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalDirection, setModalDirection] = useState<"left" | "right">(
    "right"
  );

  // Generate experience data from translations
  const generateExperiencesFromTranslations = (): ExperienceType[] => {
    const companies = [
      {
        key: "flipo",
        name: "FLiPO",
        links: [], // No links specified in original data
      },
      {
        key: "itacademy",
        name: "IT Academy",
        links: [], // No links specified in original data
      },
      {
        key: "aulaMagna",
        name: "Aula Magna",
        links: [], // No links specified in original data
      },
    ];

    return companies.map((company) => ({
      company: t(`experience.companies.${company.key}.title`),
      experience: t(`experience.companies.${company.key}.description`),
      links: company.links,
    }));
  };

  const experience = generateExperiencesFromTranslations();
  const handleCompanyClick = (company: string, cardIndex: number) => {
    setModalDirection(cardIndex % 2 === 0 ? "right" : "left");
    setActiveModal(company);

    // Ocultar el menú de navegación cuando se abre el modal
    window.dispatchEvent(new CustomEvent("hideNavigation"));
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    // Mostrar el menú de navegación cuando se cierra el modal
    window.dispatchEvent(new CustomEvent("showNavigation"));
  };
  const getAchievements = (company: string) => {
    const companiesConfig = {
      FLiPO: 7, // 7 logros para FLiPO
      "IT Academy": 7, // 7 logros para IT Academy
      "Aula Magna": 2, // 2 logros para Aula Magna
    };

    const achievementCount =
      companiesConfig[company as keyof typeof companiesConfig] || 0;

    // Generar logros basados en las traducciones únicamente
    return Array.from({ length: achievementCount }, (_, index) => ({
      title: t(`achievements.${company}.${index}.title`),
      description: t(`achievements.${company}.${index}.description`),
      impact: t(`achievements.${company}.${index}.impact`),
      icon: getAchievementIcon(company, index),
    }));
  };

  const getAchievementIcon = (company: string, index: number): string => {
    const iconMaps = {
      FLiPO: ["🎯", "🔧", "⚡", "📈", "💳", "🌿", "🤝"],
      "IT Academy": ["🎨", "🔧", "⚡", "🚀", "👥", "📝", "🎓"],
      "Aula Magna": ["🎪", "🔧"],
    };

    const icons = iconMaps[company as keyof typeof iconMaps] || [];
    return icons[index] || "✨";
  };
  const getCompanyInfo = (company: string) => {
    switch (company) {
      case "FLiPO":
        return {
          title: t("experience.companies.flipo.title"),
          period: t("experience.companies.flipo.period"),
          description: t("experience.companies.flipo.description"),
        };
      case "IT Academy":
        return {
          title: t("experience.companies.itacademy.title"),
          period: t("experience.companies.itacademy.period"),
          description: t("experience.companies.itacademy.description"),
        };
      case "Aula Magna":
        return {
          title: t("experience.companies.aulaMagna.title"),
          period: t("experience.companies.aulaMagna.period"),
          description: t("experience.companies.aulaMagna.description"),
        };
      default:
        return { title: "", period: "", description: "" };
    }
  };

  return (
    <section id="experience" className="section-padding section-bg-gradient">
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
            {t("experience.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </motion.div>{" "}
        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline central line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent transform -translate-x-1/2 origin-top"
          />
          {/* Timeline glow effect */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400/60 via-primary-300/40 to-transparent transform -translate-x-1/2 origin-top blur-sm"
          />{" "}
          {experience.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              onCompanyClick={handleCompanyClick}
            />
          ))}
        </div>
        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-xl max-w-4xl mx-auto">
            {" "}
            <h3 className="text-2xl font-bold text-white mb-6">
              {t("experience.technologiesUsed")}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React",
                "TypeScript",
                "JavaScript",
                "Redux Toolkit",
                "Vite",
                "Vitest/Jest",
                "React Testing Library",
                "Styled Components",
                "TailwindCSS",
                "SCRUM",
                "Git/GitHub",
                "PHP",
                "WordPress",
              ].map((tech) => (
                <motion.span
                  key={tech}
                  className="bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium border border-primary-500/30 shadow-sm hover:bg-primary-500/30 transition-colors cursor-default"
                  whileHover={{
                    rotate: [0, -2, 2, -2, 2, 0],
                  }}
                  transition={{
                    rotate: { duration: 0.3, ease: "easeInOut" },
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>{" "}
          </div>
        </motion.div>{" "}
        {/* Modal de Logros Dinámico */}
        <AnimatePresence>
          {activeModal && (
            <>
              {/* Overlay */}{" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={handleCloseModal}
              />{" "}
              {/* Modal */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: modalDirection === "right" ? "100%" : "-100%",
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: modalDirection === "right" ? "100%" : "-100%",
                }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`fixed ${
                  modalDirection === "right" ? "right-0" : "left-0"
                } top-0 h-full w-full max-w-2xl modal-bg ${
                  modalDirection === "right" ? "border-l" : "border-r"
                } border-primary-500/30 z-50 overflow-y-auto`}
              >
                {/* Header del Modal */}
                <div className="sticky top-0 modal-bg/95 backdrop-blur-md border-b border-primary-500/30 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      {" "}
                      <h2 className="text-2xl font-bold gradient-text">
                        {t("experience.achievements")}
                      </h2>
                      <p className="text-primary-400 mt-1">
                        {getCompanyInfo(activeModal).title}
                      </p>
                    </div>{" "}
                    <button
                      onClick={handleCloseModal}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-6 space-y-6">
                  {getAchievements(activeModal).map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-effect p-6 rounded-xl border border-primary-500/20"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0 mt-1">
                          {achievement.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-3">
                            {achievement.title}
                          </h3>

                          <div className="space-y-3">
                            {" "}
                            <div>
                              <h4 className="text-sm font-semibold text-primary-400 mb-1">
                                {t("experience.description")}
                              </h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {achievement.description}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-green-400 mb-1">
                                {t("experience.impact")}
                              </h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {achievement.impact}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Footer del Modal */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 p-6 bg-primary-500/10 rounded-xl border border-primary-500/30"
                  >
                    {" "}
                    <h3 className="text-lg font-bold text-white mb-2">
                      {t("experience.period")}{" "}
                      {getCompanyInfo(activeModal).period}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {getCompanyInfo(activeModal).description}
                    </p>
                    {/* Tecnologías específicas según la empresa */}
                    {activeModal === "IT Academy" && (
                      <div className="mt-4">
                        {" "}
                        <h4 className="text-md font-bold text-white mb-3">
                          {t("experience.technologiesAndMethodologies")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              {t("experience.frontend")}
                            </p>
                            <p className="text-gray-300">
                              {t("experience.companies.itacademy.frontend")}
                            </p>
                          </div>
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              {t("experience.testing")}
                            </p>
                            <p className="text-gray-300">
                              {t("experience.companies.itacademy.testing")}
                            </p>
                          </div>
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              {t("experience.methodologies")}
                            </p>
                            <p className="text-gray-300">
                              {t(
                                "experience.companies.itacademy.methodologies"
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              {t("experience.tools")}
                            </p>
                            <p className="text-gray-300">
                              {t("experience.companies.itacademy.tools")}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-primary-400 font-semibold mb-2">
                            {t("experience.featuredProjects")}
                          </p>
                          <div className="space-y-1">
                            <p className="text-gray-300">
                              • <strong>ITA Directory:</strong>{" "}
                              {t(
                                "experience.companies.itacademy.projects.itaDirectory"
                              )}
                            </p>
                            <p className="text-gray-300">
                              • <strong>ITA Game:</strong>{" "}
                              {t(
                                "experience.companies.itacademy.projects.itaGame"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;
