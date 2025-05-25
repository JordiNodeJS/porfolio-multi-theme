import { motion } from "framer-motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Code2, Database, Globe, Palette } from "lucide-react";

const SkillBar = ({
  skill,
  index,
}: {
  skill: { nombre: string; nivel: string };
  index: number;
}) => {
  const getProgressValue = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case "avanzado":
      case "advanced":
        return 90;
      case "intermedio":
      case "intermediate":
        return 70;
      case "básico":
      case "basic":
        return 50;
      case "b2":
        return 75;
      default:
        return 60;
    }
  };

  const getSkillColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case "avanzado":
      case "advanced":
        return "from-green-400 to-emerald-500";
      case "intermedio":
      case "intermediate":
        return "from-blue-400 to-blue-500";
      case "básico":
      case "basic":
        return "from-yellow-400 to-orange-500";
      case "b2":
        return "from-purple-400 to-purple-500";
      default:
        return "from-primary-400 to-primary-500";
    }
  };

  const progress = getProgressValue(skill.nivel);

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
        <h3 className="text-lg font-semibold text-white">{skill.nombre}</h3>
        <span className="text-sm text-gray-400 capitalize">{skill.nivel}</span>
      </div>
      <div className="w-full dark:bg-gray-700 light:bg-gray-300 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${getSkillColor(
            skill.nivel
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
  icon: any;
  name: string;
  color: string;
}) => (
  <motion.div
    whileHover={{ 
      scale: 1.1, 
      y: -5,
      rotate: [0, -1, 1, -1, 1, 0]
    }}
    transition={{ 
      duration: 0.3,
      rotate: { duration: 0.3, ease: "easeInOut" }
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
  const { skills } = usePortfolioData();

  const techStack = [
    { icon: Code2, name: "React", color: "from-blue-400 to-blue-600" },
    { icon: Globe, name: "JavaScript", color: "from-yellow-400 to-yellow-600" },
    { icon: Database, name: "TypeScript", color: "from-blue-500 to-blue-700" },
    { icon: Palette, name: "CSS/SASS", color: "from-pink-400 to-pink-600" },
    { icon: Code2, name: "Vite", color: "from-purple-400 to-purple-600" },
    { icon: Globe, name: "TailwindCSS", color: "from-teal-400 to-teal-600" },
  ];

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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Habilidades & Tecnologías
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Mi experiencia abarca diversas tecnologías modernas de desarrollo
            frontend
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
            <h3 className="text-2xl font-bold text-white mb-8">
              Nivel de Competencia
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillBar key={skill.nombre} skill={skill} index={index} />
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
            <h3 className="text-2xl font-bold text-white mb-8">
              Stack Tecnológico
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
              className="mt-8 p-6 glass-effect rounded-xl"
            >
              <h4 className="text-lg font-semibold text-white mb-3">
                Metodologías
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Agile/SCRUM",
                  "Git/GitHub",
                  "Testing (Jest/Vitest)",
                  "CI/CD",
                ].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
