import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink, X } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useState } from "react";

const ExperienceCard = ({
  experience,
  index,
  onCompanyClick,
}: {
  experience: any;
  index: number;
  onCompanyClick?: (company: string) => void;
}) => {
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
      {/* Content */}
      <div
        className={`w-5/12 ${
          index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
        }`}
      >
        {" "}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`glass-effect p-6 rounded-xl card-hover ${
            isClickableCard
              ? "cursor-pointer border border-primary-500/50 hover:border-primary-400 relative group"
              : ""
          }`}
          onClick={
            isClickableCard
              ? () => onCompanyClick?.(getCompanyName())
              : undefined
          }
          title={isClickableCard ? "Haz clic para ver logros destacados" : ""}
        >
          {/* Tooltip personalizado */}
          {isClickableCard && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 border border-primary-500/30">
              💡 Haz clic para ver logros destacados
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
            </div>
          )}

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
      </div>{" "}
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
          {/* Main timeline node */}
          <motion.div
            className="w-6 h-6 bg-primary-500 rounded-full border-4 border-slate-900 relative overflow-hidden shadow-lg shadow-primary-500/50"
            whileHover={{ scale: 1.3, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
  const { experience } = usePortfolioData();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const flipoAchievements = [
    {
      title: "Optimización de la Usabilidad del ERP",
      description:
        "Rediseñé y ajusté la interfaz para simplificar flujos de trabajo y mejorar la navegación del sistema.",
      impact:
        "Logré que los usuarios interactuaran de manera más intuitiva, reduciendo la curva de aprendizaje y aumentando la eficiencia operativa.",
      icon: "🎯",
    },
    {
      title: "Depuración y Refactorización del Código",
      description:
        "Identifiqué áreas problemáticas y apliqué las mejores prácticas de programación para mejorar la legibilidad y calidad del código.",
      impact:
        "Refactoricé módulos críticos, eliminando redundancias y creando una base de código más estable y fácil de mantener.",
      icon: "🔧",
    },
    {
      title: "Implementación de Nuevas Funcionalidades",
      description:
        "Diseñé e integré nuevas características al ERP, liderando el análisis de necesidades y usando metodologías ágiles para asegurar una integración fluida.",
      impact:
        "Incrementé la eficiencia operativa del sistema en un 30%, aportando soluciones innovadoras que respondieron directamente a las demandas de los usuarios.",
      icon: "⚡",
    },
    {
      title: "Optimización del Rendimiento",
      description:
        "Realicé ajustes para reducir los tiempos de carga, optimizar consultas y gestionar de forma eficiente los recursos del ERP.",
      impact:
        "Mejoré significativamente la performance general del sistema, lo que se tradujo en una experiencia de usuario más ágil y confiable.",
      icon: "📈",
    },
    {
      title: "Integración de Pasarela de Pago (Stripe, TPV y ERP)",
      description:
        "Lideré la implementación y optimización de la interfaz y lógica de pagos, trabajando en conjunto con el equipo de Backend, Tech Lead y Project Manager.",
      impact:
        "Agilidad Financiera: Permitió recibir pagos al instante en el momento de la entrega del pedido. Ventaja Competitiva: Fortaleció la posición de la empresa en el mercado al ofrecer una solución robusta y eficiente de gestión financiera.",
      icon: "💳",
    },
    {
      title: "Implementación de Estrategia de Git (Feature Branching)",
      description:
        "Introduje y motivé al equipo a seguir una estrategia de ramificación basada en 'feature branching', adaptada a equipos medianos.",
      impact:
        "Esta metodología mejoró la organización del código y potenció la colaboración en el desarrollo, reduciendo conflictos y facilitando la integración de nuevas funcionalidades.",
      icon: "🌿",
    },
  ];

  const itAcademyAchievements = [
    {
      title: "Optimización del ERP y Mejoras en UI/UX",
      description:
        "Implementé ajustes estratégicos en la interfaz y experiencia de usuario, simplificando los flujos de navegación y reduciendo la curva de aprendizaje.",
      impact:
        "Mejoré significativamente la usabilidad del ERP, lo que facilitó las tareas diarias y aumentó la satisfacción de los usuarios.",
      icon: "🎨",
    },
    {
      title: "Depuración y Refactorización de Código",
      description:
        "Identifiqué y solucioné áreas críticas en el código, eliminando redundancias y aplicando prácticas recomendadas de programación orientada a objetos.",
      impact:
        "Elevé la calidad y mantenibilidad del código, reduciendo el número de errores y facilitando futuras actualizaciones.",
      icon: "🔧",
    },
    {
      title: "Optimización del Rendimiento de Consultas a la API",
      description:
        "Realicé ajustes específicos en la lógica de programación para optimizar la ejecución y eficiencia de las consultas.",
      impact:
        "Se notó una reducción en los tiempos de respuesta, lo que mejoró la performance general del sistema y la experiencia del usuario.",
      icon: "⚡",
    },
    {
      title: "Implementación de Flujo de Trabajo con Git/GitHub (CI/CD)",
      description:
        "Establecí un proceso de integración y despliegue continuo a través de Git y GitHub, consolidando un flujo de trabajo ágil para el equipo.",
      impact:
        "Esto aceleró la entrega de nuevas funcionalidades y mejoras, al mismo tiempo que garantizó una mayor estabilidad en cada despliegue.",
      icon: "🚀",
    },
    {
      title: "Colaboración en Equipo Remoto (12 personas)",
      description:
        "Trabajé efectivamente en un equipo distribuido de 12 personas utilizando metodologías ágiles como Scrum y Kanban con sprints de 2 semanas.",
      impact:
        "Contribuí al desarrollo exitoso de proyectos como ITA Directory e ITA Game, mejorando las habilidades de trabajo colaborativo del equipo.",
      icon: "👥",
    },
  ];

  const aulaMagnaAchievements = [
    {
      title: "Diseño Web de Eventos",
      description:
        "Desarrollé diseños web específicos para eventos, enfocándome en la presentación visual y funcionalidad específica para cada ocasión.",
      impact:
        "Creé experiencias web atractivas que mejoraron la presencia digital de los eventos y aumentaron la participación de los asistentes.",
      icon: "🎪",
    },
    {
      title: "Mejora de Usabilidad Web",
      description:
        "Trabajé en equipo para identificar y resolver problemas de usabilidad, optimizando la navegación y accesibilidad del sitio web.",
      impact:
        "Logré una experiencia de usuario más fluida y accesible, reduciendo la tasa de abandono y mejorando la satisfacción del usuario.",
      icon: "🔧",
    },
    {
      title: "Optimización de UX/UI",
      description:
        "Implementé mejoras en la experiencia e interfaz de usuario, aplicando principios de diseño centrado en el usuario.",
      impact:
        "Mejoré significativamente la interacción del usuario con la plataforma, creando interfaces más intuitivas y atractivas.",
      icon: "✨",
    },
  ];

  const getAchievements = (company: string) => {
    switch (company) {
      case "FLiPO":
        return flipoAchievements;
      case "IT Academy":
        return itAcademyAchievements;
      case "Aula Magna":
        return aulaMagnaAchievements;
      default:
        return [];
    }
  };

  const getCompanyInfo = (company: string) => {
    switch (company) {
      case "FLiPO":
        return {
          title: "FLiPO | Frontend React Engineer",
          period: "Julio 2023 – Abril 2025",
          description:
            "Durante mi tiempo en FLiPO, una startup líder en venta online de gafas modulares y graduadas, contribuí significativamente al desarrollo y mejora del ERP interno, implementando soluciones innovadoras que impactaron directamente en la eficiencia operativa de la empresa.",
        };
      case "IT Academy":
        return {
          title: "IT Academy BCN | Frontend React Engineer",
          period: "2022",
          description:
            "En IT Academy BCN colaboré remotamente en un equipo de 12 personas utilizando metodologías ágiles (Scrum, Kanban y sprints de 2 semanas). Participé en el desarrollo de proyectos como ITA Directory e ITA Game, enfocándome en la mejora del sistema ERP y la implementación de nuevas funcionalidades.",
        };
      case "Aula Magna":
        return {
          title: "Aula Magna Business School SLU | Web Designer",
          period: "2022",
          description:
            "En Aula Magna Business School me especialicé en el diseño web de eventos, trabajando en equipo para mejorar la usabilidad web y la experiencia de usuario (UX/UI), creando soluciones visuales atractivas y funcionales.",
        };
      default:
        return { title: "", period: "", description: "" };
    }
  };

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
          />

          {experience.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              onCompanyClick={setActiveModal}
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
            </div>{" "}
          </div>
        </motion.div>{" "}
        {/* Modal de Logros Dinámico */}
        <AnimatePresence>
          {activeModal && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={() => setActiveModal(null)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-full max-w-2xl bg-slate-900 border-l border-primary-500/30 z-50 overflow-y-auto"
              >
                {/* Header del Modal */}
                <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-primary-500/30 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold gradient-text">
                        Logros Destacados
                      </h2>
                      <p className="text-primary-400 mt-1">
                        {getCompanyInfo(activeModal).title}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
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
                            <div>
                              <h4 className="text-sm font-semibold text-primary-400 mb-1">
                                Descripción:
                              </h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {achievement.description}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-green-400 mb-1">
                                Impacto:
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
                    <h3 className="text-lg font-bold text-white mb-2">
                      Período: {getCompanyInfo(activeModal).period}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {getCompanyInfo(activeModal).description}
                    </p>

                    {/* Tecnologías específicas según la empresa */}
                    {activeModal === "IT Academy" && (
                      <div className="mt-4">
                        <h4 className="text-md font-bold text-white mb-3">
                          Tecnologías y Metodologías Utilizadas:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              Frontend:
                            </p>
                            <p className="text-gray-300">
                              JavaScript, TypeScript, React.js, Redux, Context
                              API, Hooks, Styled Components
                            </p>
                          </div>
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              Testing:
                            </p>
                            <p className="text-gray-300">Vitest</p>
                          </div>
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              Metodologías:
                            </p>
                            <p className="text-gray-300">
                              Agile (Scrum, Kanban, sprints de 2 semanas), POO
                            </p>
                          </div>
                          <div>
                            <p className="text-primary-400 font-semibold mb-1">
                              Herramientas:
                            </p>
                            <p className="text-gray-300">
                              Git, GitHub, Sonar, Docker
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-primary-400 font-semibold mb-2">
                            Proyectos destacados:
                          </p>
                          <div className="space-y-1">
                            <p className="text-gray-300">
                              • <strong>ITA Directory:</strong> Proyecto para
                              estudiantes de Barcelona Activa - IT Academy
                            </p>
                            <p className="text-gray-300">
                              • <strong>ITA Game:</strong> Plataforma de
                              gamificación para alumnos de academia de código
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
