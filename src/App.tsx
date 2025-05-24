import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ScrollToTop from "./components/ScrollToTop";
import FloatingParticles from "./components/FloatingParticles";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

function App() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    // Add scroll listener to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  return (
    <>
      <LoadingScreen />

      <div className="min-h-screen dark:bg-slate-900 light:bg-gray-50 transition-colors duration-300 overflow-x-hidden relative">
        {/* Floating background particles */}
        <FloatingParticles />

        <Navigation />

        {/* Main content with parallax-like sections */}
        <main className="relative z-10">
          <Hero />

          {/* Divider with animated gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-8"></div>

          <Projects />

          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-8"></div>

          <Skills />

          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-8"></div>

          <Experience />

          <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-8"></div>

          <Education />
        </main>

        {/* Footer */}
        <footer className="dark:bg-slate-800/50 light:bg-white/50 backdrop-blur-sm border-t dark:border-slate-700/50 light:border-gray-200/50 py-8 relative z-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="dark:text-slate-400 light:text-gray-600 text-sm">
              © {new Date().getFullYear()} Mi Portfolio. Hecho con ❤️ usando
              React + TypeScript + Framer Motion
            </p>
          </div>
        </footer>

        {/* Scroll to top button */}
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
