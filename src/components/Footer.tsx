import { motion } from "framer-motion";
import { Github, Linkedin, Heart, Code, Coffee } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/JordiNodeJS",
      color: "hover:text-gray-300",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jorge-frontend/",
      color: "hover:text-blue-400",
    },
  ];

  const techStack = [
    "React",
    "TypeScript",
    "Framer Motion",
    "TailwindCSS",
    "Vite",
    "Bun",
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold gradient-text mb-3">JORGe</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Frontend React Developer apasionado por crear experiencias
              digitales excepcionales con tecnologías modernas.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-white font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Code className="w-4 h-4" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/50 hover:border-primary-500/50 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-white font-semibold mb-4">Conecta conmigo</h4>
            <div className="flex gap-4 justify-center md:justify-end">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} hover:border-primary-500/50 hover:bg-slate-700/50`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Jorge Portfolio.</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-4 h-4 text-red-400 animate-pulse" />{" "}
              y
              <Coffee className="w-4 h-4 text-amber-400" />
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300"
          >
            Diseñado y desarrollado con ❤️
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
