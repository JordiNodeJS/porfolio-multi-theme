import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useTheme } from "../contexts/ThemeContext";

const Navigation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleHideNavigation = () => {
      setIsHidden(true);
      setIsOpen(false);
    };

    const handleShowNavigation = () => {
      setIsHidden(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hideNavigation", handleHideNavigation);
    window.addEventListener("showNavigation", handleShowNavigation);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hideNavigation", handleHideNavigation);
      window.removeEventListener("showNavigation", handleShowNavigation);
    };
  }, []);

  const navItems = [
    { name: t("navigation.home"), href: "#hero" },
    { name: t("navigation.experience"), href: "#experience" },
    { name: t("navigation.projects"), href: "#projects" },
    { name: t("navigation.skills"), href: "#skills" },
    { name: t("navigation.education"), href: "#education" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/JordiNodeJS", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jorge-frontend/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:your-email@example.com", label: "Email" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? "glass-effect shadow-2xl backdrop-blur-md nav-bg" 
          : theme === "vintage" 
            ? "bg-[#6e4c30]" 
            : "bg-transparent"
      } ${isHidden ? "pointer-events-none" : ""}`}
    >
      <div className={`container-custom ${theme === "vintage" ? "border-b border-[#a78a21]/30" : ""}`}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold ${
              theme === "vintage"
                ? "text-[#a87e58] hover:text-[#e3b505]"
                : theme === "retro-pastel"
                ? "text-[#3d2c2c] hover:text-[#e56b81]"
                : "text-white hover:text-primary-400"
            } transition-colors duration-300`}
          >
            JORGe
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer ${
                  theme === "vintage" 
                    ? "text-[#f3ebd3] hover:text-[#e3b505] font-medium" 
                    : theme === "retro-pastel"
                    ? "text-[#3d2c2c]/80 hover:text-[#e56b81]" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Language Selector - Visible en móvil */}
            <div className="lg:hidden">
              <LanguageSelector />
            </div>
            
            {/* Theme Toggle - Visible en móvil */}
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
            
            {/* Social Links - Oculto en móvil */}
            <div className="hidden lg:flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 transition-colors duration-300 ${
                    theme === "vintage" 
                      ? "text-[#f3ebd3] hover:text-[#e3b505]" 
                      : theme === "retro-pastel"
                      ? "text-[#3d2c2c]/80 hover:text-[#e56b81]" 
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}

              {/* Language Selector */}
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${
              theme === "vintage" 
                ? "text-[#f3ebd3] hover:text-[#e3b505]" 
                : theme === "retro-pastel"
                ? "text-[#3d2c2c]/80 hover:text-[#e56b81]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden glass-effect border-t ${
          theme === "vintage" 
            ? "border-[#a78a21]/30 bg-[#6e4c30]" 
            : theme === "retro-pastel"
            ? "border-[#e56b81]/30" 
            : "border-white/10"
        }`}
      >
        <div className="container-custom py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-300 font-medium py-2 text-left bg-transparent border-none cursor-pointer ${
                  theme === "vintage" 
                    ? "text-[#f3ebd3] hover:text-[#e3b505]" 
                    : theme === "retro-pastel"
                    ? "text-[#3d2c2c]/90 hover:text-[#e56b81]" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            
            <div className="flex items-center justify-center space-x-4 py-4 lg:hidden">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 transition-colors duration-300 ${
                    theme === "vintage" 
                      ? "text-[#f3ebd3] hover:text-[#e3b505]" 
                      : theme === "retro-pastel"
                      ? "text-[#3d2c2c]/80 hover:text-[#e56b81]" 
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            <div className={`flex items-center justify-between pt-4 border-t ${
              theme === "vintage" 
                ? "border-[#a78a21]/30" 
                : theme === "retro-pastel"
                ? "border-[#e56b81]/30" 
                : "border-white/10"
            }`}>
              <div className="lg:hidden">
                <LanguageSelector />
              </div>
              <div className="lg:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
