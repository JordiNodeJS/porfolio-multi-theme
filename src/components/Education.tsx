import { motion } from "framer-motion";
import { GraduationCap, Calendar, ExternalLink, Star } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";

const EducationCard = ({
  education,
  index,
}: {
  education: any;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl overflow-hidden card-hover group"
    >
      {" "}
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500/20 to-purple-500/20 p-6 border-b border-themed">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-primary-500/20 rounded-lg"
            >
              <GraduationCap className="w-6 h-6 text-primary-400" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-themed group-hover:text-primary-400 transition-colors">
                {education.title}
              </h3>
              <p className="text-primary-400 font-medium">{education.center}</p>
            </div>
          </div>

          {education.link && (
            <motion.a
              href={education.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
              title="Ver certificado o proyecto"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>{" "}
        {/* Duration */}
        <div className="flex items-center gap-2 mt-3 text-muted">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {education.start_date} - {education.end_date}
          </span>
        </div>
      </div>{" "}
      {/* Content */}
      <div className="p-6">
        <p className="text-muted text-sm leading-relaxed mb-6">
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
              className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
            >
              {tag}
            </motion.span>
          ))}{" "}
          {education.tags.length > 6 && (
            <span className="px-3 py-1 bg-gray-500/20 text-muted text-xs rounded-full border border-gray-500/30">
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
          className={`absolute top-4 right-4 ${education.link ? 'mr-12' : ''}`}
        >
          <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-500/30">
            <Star className="w-3 h-3" />
            Destacado
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Education = () => {
  const { education } = usePortfolioData();

  const stats = [
    { label: "Formaciones", value: education.length, icon: GraduationCap },
    { label: "Tecnologías", value: "15+", icon: Star },
    { label: "Proyectos", value: "10+", icon: Calendar },
  ];

  return (
    <section
      id="education"
      className="section-padding bg-section-light dark:bg-section-dark"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Formación Académica
          </h2>{" "}
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Mi camino de aprendizaje continuo en tecnologías de desarrollo
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-6 rounded-xl text-center card-hover"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-lg mb-4"
              >
                <stat.icon className="w-6 h-6 text-primary-400" />
              </motion.div>{" "}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-themed mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} education={edu} index={index} />
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
          {" "}
          <div className="glass-effect p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-themed mb-4">
              Filosofía de Aprendizaje
            </h3>
            <p className="text-muted leading-relaxed">
              "Creo firmemente en el aprendizaje continuo y la adaptación a las
              nuevas tecnologías. Mi formación no solo abarca conocimientos
              técnicos, sino también metodologías ágiles, trabajo en equipo y
              mejores prácticas de desarrollo que me permiten crear soluciones
              robustas y escalables."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
