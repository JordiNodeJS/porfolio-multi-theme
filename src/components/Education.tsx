import { motion } from "framer-motion";
import { GraduationCap, Calendar, ExternalLink, Star } from "lucide-react";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";
import { usePortfolioDataFromLocales } from "../hooks/usePortfolioDataFromLocales";
import type { Education as EducationType } from "../types";
import { TextRevealAnimation } from "./TextRevealAnimation";

const EducationCard = ({
  education,
  index,
  translations,
}: {
  education: EducationType; // Changed to EducationType
  index: number;
  translations: {
    viewCertificate: string;
    featured: string;
  };
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl overflow-hidden card-hover group shadow-md hover:shadow-lg border-t-4 border-t-primary-500 theme-vintage:border-t-vintage-terracotta theme-vintage:shadow-lg theme-retro-pastel:border-t-retroPastel-pink"
    >
      {/* Header */}
      <div
        className="bg-gradient-to-r from-primary-600/50 to-purple-600/50 dark:from-primary-500/50 dark:to-purple-500/50 p-6 border-b border-themed/30 shadow-sm relative 
        theme-vintage:from-vintage-brown-darker/95 theme-vintage:to-vintage-brown-dark theme-vintage:border-vintage-cream/40 theme-vintage:shadow-lg
        theme-retro-pastel:from-retroPastel-custard/70 theme-retro-pastel:to-retroPastel-peach/80 theme-retro-pastel:border-retroPastel-lavender/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 pr-12">
            {/* Added padding-right to prevent overlap */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.9, y: 10 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.2, 0.8, 0.2, 1],
                },
              }}
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                rotate: [0, 15, -15, 15, 0],
                scale: 1.1,
                y: -2,
                transition: {
                  duration: 1,
                  type: "spring",
                  bounce: 0.5,
                  y: { duration: 0.3 },
                },
              }}
              whileTap={{
                scale: 0.95,
                rotate: 360,
                transition: {
                  duration: 0.5,
                  rotate: { type: "spring", stiffness: 200 },
                },
              }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{
                default: {
                  duration: 0.5,
                  ease: [0.2, 0.8, 0.2, 1],
                },
                opacity: { duration: 0.8 },
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 300,
                  mass: 0.5,
                },
              }}
              className="p-3 bg-primary-600/50 dark:bg-primary-500/50 rounded-xl shadow-lg 
                hover:shadow-xl transition-all duration-300 cursor-pointer
                theme-vintage:bg-vintage-cream/80 theme-vintage:shadow-vintage-mustard/40
                theme-vintage:hover:bg-vintage-mustard-light/90"
            >
              <GraduationCap
                className="w-6 h-6 text-white dark:text-white 
                theme-vintage:text-vintage-brown-darker theme-vintage:group-hover:text-vintage-brown-dark
                transition-all duration-300 group-hover:scale-110"
              />
            </motion.div>
            <div>
              <h3
                className="text-xl font-bold text-gray-900 dark:text-gray-50 
              group-hover:text-primary-800 dark:group-hover:text-white transition-colors duration-200
              theme-vintage:text-vintage-mustard-light theme-vintage:group-hover:text-vintage-mustard-light/90 
              theme-vintage:font-bold hover:drop-shadow-md hover:underline hover:underline-offset-4"
              >
                {education.title}
              </h3>
              <p
                className="text-primary-800 dark:text-primary-300 font-medium 
              theme-vintage:text-vintage-cream/95 theme-vintage:font-semibold theme-vintage:drop-shadow-sm
              theme-retro-pastel:text-retroPastel-text-dark"
              >
                {education.center}
              </p>
            </div>
          </div>
          {education.link && (
            <motion.a
              href={education.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300 transition-colors z-10 theme-vintage:text-vintage-cream/80 theme-vintage:hover:text-vintage-mustard-light"
              title={translations.viewCertificate}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>
        {/* Duration */}
        <div className="flex items-center gap-2 mt-3 text-gray-700 dark:text-gray-300 theme-vintage:text-vintage-cream theme-retro-pastel:text-retroPastel-text">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">
            {education.start_date} - {education.end_date}
          </span>
        </div>
      </div>
      {/* Content */}
      <div
        className="p-6 bg-white/10 dark:bg-gray-900/20 
        theme-vintage:bg-vintage-brown-darker/95 theme-vintage:border-t theme-vintage:border-vintage-cream/40 
        theme-retro-pastel:bg-retroPastel-background/30 theme-retro-pastel:border-t theme-retro-pastel:border-retroPastel-lavender/40"
      >
        <p
          className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed mb-6 font-medium 
          theme-vintage:text-vintage-cream/95 theme-vintage:font-medium theme-vintage:drop-shadow-sm
          theme-retro-pastel:text-retroPastel-text-dark/95"
        >
          {education.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {education.tags.slice(0, 6).map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-600/30 dark:bg-purple-500/30 text-purple-800 dark:text-purple-200 text-xs rounded-full border border-purple-500/40 font-medium hover:bg-purple-600/40 dark:hover:bg-purple-500/40 transition-colors cursor-default
                theme-vintage:bg-vintage-mustard/80 theme-vintage:text-vintage-brown-darker/95 theme-vintage:border-vintage-mustard-dark/90 theme-vintage:hover:bg-vintage-mustard theme-vintage:hover:border-vintage-mustard-light theme-vintage:font-bold theme-vintage:shadow-md theme-vintage:drop-shadow-sm"
            >
              {tag}
            </span>
          ))}
          {education.tags.length > 6 && (
            <span
              className="px-3 py-1 bg-gray-300/50 dark:bg-gray-500/30 text-gray-800 dark:text-gray-200 text-xs rounded-full border border-gray-500/30 font-medium hover:bg-gray-300/60 dark:hover:bg-gray-500/40 transition-all duration-200 cursor-default
                theme-vintage:bg-vintage-cream/30 theme-vintage:text-vintage-cream theme-vintage:border-vintage-cream/50 theme-vintage:hover:bg-vintage-cream/40 theme-vintage:hover:border-vintage-cream theme-vintage:font-bold theme-vintage:shadow-sm
                theme-retro-pastel:bg-retroPastel-mint/40 theme-retro-pastel:text-retroPastel-text theme-retro-pastel:border-retroPastel-mint/50 theme-retro-pastel:hover:bg-retroPastel-mint/50"
            >
              +{education.tags.length - 6}
            </span>
          )}
        </div>
      </div>
      {/* Featured Badge */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute top-0 right-0"
        >
          <div className="flex items-center gap-1 bg-yellow-600/70 dark:bg-yellow-500/70 theme-vintage:bg-vintage-mustard theme-vintage:border-l-2 theme-vintage:border-b-2 theme-vintage:border-vintage-cream/40 text-white px-3 py-1.5 text-xs font-medium shadow-md rounded-bl-lg">
            <Star className="w-3 h-3 theme-vintage:text-vintage-brown-dark" />
            <span className="theme-vintage:text-vintage-brown-dark/90 theme-vintage:font-bold">
              {translations.featured}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Education = () => {
  const { education: educationTranslations } = usePortfolioTranslations();
  const { education: educationDataFromLocales } = usePortfolioDataFromLocales();

  // Use education data from locales instead of JSON file
  const education = educationDataFromLocales || [];

  const stats = [
    {
      label: educationTranslations.stats.technologies,
      value: "15+",
      icon: Star,
    },
    {
      label: educationTranslations.stats.projects,
      value: "10+",
      icon: Calendar,
    },
  ];
  return (
    <section
      id="education"
      className="section-padding bg-section-light dark:bg-section-dark py-16"
    >
      <div className="container-custom">
        {" "}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl mb-8 font-bold text-gray-900 dark:text-white
            theme-brutalism:brutal-title
            theme-vintage:text-vintage-mustard-light theme-vintage:font-bold theme-vintage:text-shadow-lg
            theme-retro-pastel:text-retroPastel-text-dark theme-retro-pastel:font-bold
            transition-colors duration-300"
          >
            {educationTranslations.title}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed theme-vintage:text-vintage-cream theme-vintage:font-semibold theme-vintage:text-shadow theme-retro-pastel:text-retroPastel-text/90">
            {educationTranslations.subtitle}
          </p>
        </motion.div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-6 rounded-xl text-center card-hover shadow-md hover:shadow-lg border-t-4 border-t-purple-500 theme-vintage:border-t-vintage-terracotta theme-vintage:shadow-lg theme-retro-pastel:border-t-retroPastel-pink"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-primary-600/30 dark:bg-primary-500/30 rounded-lg mb-4 shadow-sm theme-vintage:bg-vintage-cream/30 theme-vintage:border theme-vintage:border-vintage-cream/20"
              >
                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-300 theme-vintage:text-vintage-cream" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-primary-600 dark:text-primary-300 mb-2 theme-vintage:text-vintage-mustard-light"
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-700 dark:text-gray-300 font-medium theme-vintage:text-vintage-cream theme-vintage:font-semibold theme-retro-pastel:text-retroPastel-text/90">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>{" "}
        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <EducationCard
              key={edu.id}
              education={edu}
              index={index}
              translations={{
                viewCertificate: educationTranslations.viewCertificate,
                featured: educationTranslations.featured,
              }}
            />
          ))}
        </div>
        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            className="glass-effect p-8 rounded-xl max-w-4xl mx-auto shadow-md border-l-4 border-l-primary-500 bg-white/10 dark:bg-white/5 
              theme-vintage:border-l-vintage-mustard theme-vintage:bg-gradient-to-br theme-vintage:from-vintage-brown-dark/40 theme-vintage:to-vintage-olive/30 theme-vintage:shadow-lg
              theme-retro-pastel:border-l-retroPastel-lavender"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 theme-vintage:text-vintage-mustard-light">
              {educationTranslations.learningPhilosophy.title}
            </h3>
            <TextRevealAnimation
              text={`"${educationTranslations.learningPhilosophy.description}"`}
              className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic theme-vintage:text-vintage-cream theme-vintage:font-medium theme-retro-pastel:text-retroPastel-text/90"
              charDelay={0.03}
              animationStyle="fade"
              once={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
