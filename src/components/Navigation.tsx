import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import PreferencesManager from "./PreferencesManager";
import { useTheme } from "../hooks/useTheme";
import { useScrollToSection } from "../hooks/useScrollToSection";

const Navigation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { scrollToSection } = useScrollToSection();
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
    scrollToSection(href);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out pointer-events-none ${
        theme === "brutalism"
          ? "bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_#ff6b6b,8px_8px_0px_0px_#4ecdc4]"
          : scrolled
          ? "glass-effect shadow-2xl backdrop-blur-md nav-bg"
          : theme === "vintage"
          ? "bg-[#6e4c30]"
          : "bg-transparent"
      } ${isHidden ? "pointer-events-none" : ""}`}
    >
      <div
        className={`container-custom pointer-events-auto ${
          theme === "vintage"
            ? "border-b border-[#a78a21]/30"
            : theme === "brutalism"
            ? "border-b-2 border-black"
            : ""
        }`}
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold transition-colors duration-300 ${
              theme === "vintage"
                ? "text-[#a87e58] hover:text-[#e3b505]"
                : theme === "retro-pastel"
                ? "text-[#3d2c2c] hover:text-[#e56b81]"
                : theme === "brutalism"
                ? "text-black font-black text-3xl hover:text-[#ff6b6b] transform hover:skew-x-[-5deg] transition-all duration-300"
                : "text-white hover:text-primary-400"
            }`}
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
                    : theme === "brutalism"
                    ? "text-black font-bold hover:text-[#ff6b6b] hover:bg-[#ffeaa7] px-3 py-2 border-2 border-black hover:shadow-[2px_2px_0px_0px_#4ecdc4] transform hover:skew-x-[-2deg] transition-all duration-200"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Language Selector - Hidden when mobile menu is open to prevent overlay issues */}
            <div
              className={`block lg:hidden ${isOpen ? "invisible" : "visible"}`}
            >
              <LanguageSelector />
            </div>

            {/* Theme Toggle - Hidden when mobile menu is open to prevent overlay issues */}
            <div
              className={`block lg:hidden ${isOpen ? "invisible" : "visible"}`}
            >
              <ThemeToggle />
            </div>

            {/* Social Links - Solo en desktop */}
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
                      : theme === "brutalism"
                      ? "text-black hover:text-[#ff6b6b] hover:bg-[#4ecdc4] border-2 border-black hover:shadow-[2px_2px_0px_0px_#ffeaa7] transition-all duration-200 rounded-none"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}

              {/* Language Selector y Theme Toggle en desktop */}
              <div className="flex items-center space-x-2">
                <LanguageSelector />
                <ThemeToggle />
                <PreferencesManager />
              </div>
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
                : theme === "brutalism"
                ? "text-black hover:text-[#ff6b6b] hover:bg-[#ffeaa7] border-2 border-black hover:shadow-[2px_2px_0px_0px_#4ecdc4] transition-all duration-200"
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
        className={`md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        } ${
          theme === "vintage"
            ? "glass-effect border-t border-[#a78a21]/30 bg-[#6e4c30]"
            : theme === "retro-pastel"
            ? "glass-effect border-t border-[#e56b81]/30"
            : theme === "brutalism"
            ? "bg-[#ffeaa7] border-t-4 border-black shadow-[0px_4px_0px_0px_#ff6b6b,0px_8px_0px_0px_#4ecdc4]"
            : "glass-effect border-t border-white/10"
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
                    : theme === "brutalism"
                    ? "text-black font-bold hover:text-[#ff6b6b] hover:bg-[#4ecdc4] px-3 py-2 border-2 border-black hover:shadow-[2px_2px_0px_0px_#96ceb4] transform hover:skew-x-[-2deg] transition-all duration-200 mb-2"
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
                      : theme === "brutalism"
                      ? "text-black hover:text-[#ff6b6b] hover:bg-[#96ceb4] border-2 border-black hover:shadow-[2px_2px_0px_0px_#45b7d1] transition-all duration-200 rounded-none"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div
              className={`flex items-center justify-between pt-4 border-t ${
                theme === "vintage"
                  ? "border-[#a78a21]/30"
                  : theme === "retro-pastel"
                  ? "border-[#e56b81]/30"
                  : theme === "brutalism"
                  ? "border-black border-t-2"
                  : "border-white/10"
              }`}
            >
              <div className="lg:hidden pointer-events-none">
                <LanguageSelector />
              </div>
              <div className="lg:hidden">
                <ThemeToggle />
              </div>
              <div className="lg:hidden">
                <PreferencesManager />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
