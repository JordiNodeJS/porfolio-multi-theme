import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: any;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`flex ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      } items-center mb-12`}
    >
      {/* Content */}
      <div
        className={`w-5/12 ${
          index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-effect p-6 rounded-xl card-hover"
        >
          <h3 className="text-xl font-bold text-white mb-2">
            {experience.company}
          </h3>

          <div className="flex items-center gap-2 mb-4 text-primary-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">España</span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {experience.experience}
          </p>

          {/* Links */}
          {experience.links && (
            <div className="flex gap-2 flex-wrap">
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
                  <ExternalLink className="w-3 h-3" />
                  Ver proyecto
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="w-4 h-4 bg-primary-500 rounded-full border-4 border-slate-900 z-10 relative">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary-400 rounded-full"
            />
          </div>

          {/* Timeline Line */}
          {index < 1 && (
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
              viewport={{ once: true }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-500 to-transparent"
            />
          )}
        </motion.div>
      </div>

      {/* Empty space for alternate layout */}
      <div className="w-5/12" />
    </motion.div>
  );
};

const Experience = () => {
  const { experience } = usePortfolioData();

  return (
    <section
      id="experience"
      className="section-padding bg-gradient-to-b from-slate-900 to-gray-800"
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
            Experiencia Profesional
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Mi trayectoria profesional desarrollando soluciones innovadoras
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
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
            <h3 className="text-2xl font-bold text-white mb-6">
              Tecnologías utilizadas
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
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-primary-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
