import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";
import { useTranslation } from "react-i18next";
import type { Project } from "../types";
import { useState, useEffect } from "react";

// Data previously from projects.json, now used as a fallback for non-translatable fields
const rawProjectsFallback: Project[] = [
  {
    id: "remove-bg-001",
    title: "Remove Background",
    status: "in production",
    imgCover: "img-project/remove-bg.png",
    description:
      "Web application that automatically removes image backgrounds using artificial intelligence. Allows uploading images, processing them on the backend, and downloading the background-free version. Educational example of a modern monorepo with Next.js and Express using Bun.",
    link: "https://github.com/JordiNodeJS/remove-background",
    demo: "http://ec2-3-254-74-19.eu-west-1.compute.amazonaws.com:3000/",
    tags: [
      "typescript",
      "nextjs",
      "express",
      "bun",
      "monorepo",
      "clerk",
      "tailwindcss",
      "ai",
      "imgly/background-removal-node",
    ],
  },
  {
    id: "9b681b4d",
    title: "IT Academy directory",
    status: "in production",
    imgCover: "img-project/itacademy.png",
    description:
      "Working under agile methodologies such as SCRUM, fixing bugs, testing, new functionalities, documentation in conjunction with backend.",
    link: "https://github.com/IT-Academy-BCN/ita-directory",
    demo: "https://ita-directory-app.vercel.app",
    tags: [
      "javascript",
      "react",
      "tailwindcss",
      "vite",
      "Redux Toolkit",
      "Vitest/Jest",
      "React Testing Library",
      "Styled Components",
      "UseForms",
    ],
  },
  {
    id: "9b68cc3d",
    title: "Ita-Game",
    status: "in production",
    imgCover: "img-project/itagame.png",
    description: "Gamification of a study platform using React and Tailwind.",
    link: "https://github.com/IT-Academy-BCN/ita-game",
    tags: ["javascript", "react", "tailwindcss", "vite"],
  },
  {
    id: "9b68aa3d",
    title: "Placeholder generator for images",
    status: "done",
    imgCover: "img-project/generatelow.png",
    description:
      "The App consists of generating a very low resolution image, respecting the outline of the original image, with the purpose of being used as a placeholder or temporary substitute.",
    link: "https://github.com/JordiNodeJS/generate-low-placeholder",
    demo: "https://generate-low-placeholder.netlify.app/",
    tags: ["javascript", "react", "tailwindcss", "cloudinary", "vite"],
  },
  {
    id: "9b68qa3d",
    title: "King-league-project",
    status: "retired",
    imgCover: "img-project/kings-league-project.png",
    description:
      "Open source project, where I collaborate fixing fix some bugs, docu, github actions.",
    link: "https://github.com/JordiNodeJS/kings-league-project",
    tags: ["javascript", "react", "tailwindcss", "git actions", "vite"],
  },
  {
    id: "d4613430",
    title: "App sobre el tiempo",
    status: "done",
    imgCover: "img-project/weather.png",
    description:
      "The purpose of this app was to build an interface between the client and a third-party API.",
    link: "https://github.com/JordiNodeJS/weather-app",
    tags: ["html", "javascript", "css", "api"],
  },
  {
    id: "781d5bab",
    title: "Adivina",
    status: "done",
    imgCover: "img-project/game.png",
    description:
      "Basic game created in javascript whose learning objective was the manipulation of the DOM of the HTML document to present the results.",
    link: "https://github.com/JordiNodeJS/AdivinaPro",
    tags: ["html", "javascript", "bootstrap"],
  },
  {
    id: "a3203cfa",
    title: "Image Slideshow Effect Only JS",
    status: "done",
    imgCover: "img-project/slider.png",
    description: "A sample button of an automatic slider.",
    link: "https://jordinodejs.github.io/Image-Slideshow-Effect-OnlyJS/",
    tags: ["html", "javascript", "css"],
  },
  {
    id: "a3203tra",
    title: "FreeForEver",
    status: "done",
    imgCover: "img-project/freeforever.png",
    description: "UX/UI and functionalities to architecture.",
    link: "https://github.com/JordiNodeJS/freeforever",
    tags: [
      "html",
      "javascript",
      "css",
      "React",
      "tailwind",
      "Firebase",
      "Firestore",
    ],
  },
];

const ProjectCard = ({
  project,
  index,
  projectsUiStrings, // Contains translated UI strings like "View Code", "Live Demo"
}: {
  project: Project; // This project comes from rawProjectsFallback
  index: number;
  projectsUiStrings: {
    viewProject: string;
    viewCode: string;
    technologies: string;
    liveDemo: string;
    sourceCode: string;
    viewMore: string;
  };
}) => {
  const { t } = useTranslation(); // ProjectCard uses its own t function

  // Function to get translated title and description, falling back to project's own data
  const getProjectTranslation = (
    id: string,
    field: "title" | "description"
  ) => {
    const translationKey = `projects.items.${id}.${field}`;
    // Use project[field] (from rawProjectsFallback) as the defaultValue
    const translation = t(translationKey, { defaultValue: project[field] });
    return translation;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass-effect rounded-2xl overflow-hidden card-hover"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center"
        >
          {project.imgCover ? (
            <img
              src={`${import.meta.env.BASE_URL}${project.imgCover}`} // imgCover from rawProjectsFallback with correct base path
              alt={getProjectTranslation(project.id, "title")}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl text-gray-400">📱</div>
          )}
        </motion.div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.link && ( // link from rawProjectsFallback
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="tooltip bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-300 hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                data-tooltip={projectsUiStrings.sourceCode} // Translated UI string
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {project.demo && ( // demo from rawProjectsFallback
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-primary-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-primary-600/80 transition-all duration-300 flex-1 flex items-center justify-center gap-2 hover:shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{projectsUiStrings.liveDemo}</span>{" "}
                {/* Translated UI string */}
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
            {getProjectTranslation(project.id, "title")}
          </h3>
          <div className="flex gap-1.5">
            {project.link && (
              <span
                className="tooltip w-2 h-2 rounded-full bg-blue-400"
                data-tooltip={projectsUiStrings.sourceCode}
              ></span>
            )}
            {project.demo && (
              <span
                className="tooltip w-2 h-2 rounded-full bg-green-400"
                data-tooltip={projectsUiStrings.liveDemo}
              ></span>
            )}
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {getProjectTranslation(project.id, "description")}
        </p>
        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags?.slice(0, 4).map(
            (
              tag // tags from rawProjectsFallback
            ) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full border border-primary-500/30 cursor-default"
              >
                {tag}
              </span>
            )
          )}
        </div>
        {project.tags && project.tags.length > 4 && (
          <div className="mt-1 text-xs text-gray-400">
            +{project.tags.length - 4} más
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { i18n } = useTranslation(); // Only need i18n here for language change detection
  const { projects: projectsTranslationsHook } = usePortfolioTranslations(); // UI strings for the section
  const [visibleProjects, setVisibleProjects] = useState(6);
  // currentProjects will simply be our fallback data. ProjectCard handles the dynamic translation.
  const [currentProjects, setCurrentProjects] =
    useState<Project[]>(rawProjectsFallback);

  useEffect(() => {
    // This effect is primarily to ensure re-render when language changes,
    // allowing ProjectCard to pick up new translations via its own useTranslation hook.
    // We can also update currentProjects if rawProjectsFallback itself could change, but it's static here.
    setCurrentProjects(rawProjectsFallback);
  }, [i18n.language]); // Re-evaluate if language changes

  const totalProjects = currentProjects.length;

  const showMoreProjects = () => {
    setVisibleProjects(totalProjects);
  };

  if (!projectsTranslationsHook) {
    return <div>Loading section translations...</div>;
  }

  return (
    <section id="projects" className="section-padding section-bg-gradient">
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
          <h2
            className="text-4xl md:text-5xl mb-8 font-bold text-gray-900 dark:text-white
            theme-brutalism:brutal-title
            theme-vintage:text-vintage-mustard-light theme-vintage:font-bold theme-vintage:text-shadow-lg
            theme-retro-pastel:text-retroPastel-text-dark theme-retro-pastel:font-bold
            transition-colors duration-300"
          >
            {projectsTranslationsHook.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {projectsTranslationsHook.subtitle}
          </p>
        </motion.div>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project} // Pass the project from rawProjectsFallback
              index={index}
              projectsUiStrings={projectsTranslationsHook} // Pass general UI strings for the card
            />
          ))}
        </div>
        {/* View More Button */}
        {visibleProjects < totalProjects && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={showMoreProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-primary-500/50 hover:border-primary-400"
            >
              {projectsTranslationsHook.viewMore}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
