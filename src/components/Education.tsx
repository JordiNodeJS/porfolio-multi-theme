import { motion } from "framer-motion";
import { GraduationCap, Calendar, ExternalLink, Star } from "lucide-react";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";
import type { Education as EducationType } from "../types";
import educationData from "../db/education.json";

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
      className="glass-effect rounded-xl overflow-hidden card-hover group shadow-md hover:shadow-lg border-t-4 border-t-primary-500"
    >
      {" "}
      {/* Header */}{" "}
      <div className="bg-gradient-to-r from-primary-600/30 to-purple-600/30 dark:from-primary-500/30 dark:to-purple-500/30 p-6 border-b border-themed shadow-sm relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 pr-12">
            {" "}
            {/* Added padding-right to prevent overlap */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-primary-600/30 dark:bg-primary-500/30 rounded-lg shadow-sm"
            >
              <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-300" />
            </motion.div>
            <div>
              {" "}
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                {education.title}
              </h3>
              <p className="text-primary-700 dark:text-primary-400 font-medium">
                {education.center}
              </p>
            </div>
          </div>{" "}
          {education.link && (
            <motion.a
              href={education.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300 transition-colors z-10"
              title={translations.viewCertificate}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>{" "}
        {/* Duration */}
        <div className="flex items-center gap-2 mt-3 text-gray-700 dark:text-gray-300">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">
            {education.start_date} - {education.end_date}
          </span>
        </div>
      </div>{" "}
      {/* Content */}
      <div className="p-6">
        {" "}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium">
          {education.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {education.tags.slice(0, 6).map((tag: string, tagIndex: number) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: tagIndex * 0.05 }}
              viewport={{ once: true }}
              className="px-3 py-1 bg-purple-600/30 dark:bg-purple-500/30 text-purple-800 dark:text-purple-200 text-xs rounded-full border border-purple-500/40 font-medium hover:bg-purple-600/40 dark:hover:bg-purple-500/40 transition-colors cursor-default"
            >
              {tag}
            </motion.span>
          ))}{" "}
          {education.tags.length > 6 && (
            <span className="px-3 py-1 bg-gray-300/40 dark:bg-gray-500/40 text-gray-800 dark:text-gray-200 text-xs rounded-full border border-gray-500/40 font-medium hover:bg-gray-300/50 dark:hover:bg-gray-500/50 transition-colors cursor-default">
              +{education.tags.length - 6}
            </span>
          )}
        </div>
      </div>{" "}
      {/* Featured Badge */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute top-0 right-0"
        >
          {" "}
          <div className="flex items-center gap-1 bg-yellow-600/70 dark:bg-yellow-500/70 text-white px-3 py-1.5 text-xs font-medium shadow-sm rounded-bl-lg">
            {" "}
            <Star className="w-3 h-3" />
            {translations.featured}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Education = () => {
  const { education: educationTranslations } = usePortfolioTranslations();

  // Use education data directly from JSON file
  const education = educationData as EducationType[];

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
          {" "}
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 drop-shadow-sm">
            {educationTranslations.title}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
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
              className="glass-effect p-6 rounded-xl text-center card-hover shadow-md hover:shadow-lg border-t-4 border-t-purple-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-primary-600/30 dark:bg-primary-500/30 rounded-lg mb-4 shadow-sm"
              >
                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-300" />
              </motion.div>{" "}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-primary-600 dark:text-primary-300 mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
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
        </div>{" "}
        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {" "}
          <div className="glass-effect p-8 rounded-xl max-w-4xl mx-auto shadow-md border-l-4 border-l-primary-500 bg-white/10 dark:bg-white/5">
            {" "}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {educationTranslations.learningPhilosophy.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic">
              "{educationTranslations.learningPhilosophy.description}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
