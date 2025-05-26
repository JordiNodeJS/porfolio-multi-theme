import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingParticles from "./components/FloatingParticles";
import LoadingScreen from "./components/LoadingScreen";
import BrutalismDemo from "./components/BrutalismDemo";
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

          <Experience />

          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-8"></div>

          <Projects />

          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-8"></div>

          <Skills />

          <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-8"></div>

          <Education />

          <div className="h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent mx-8"></div>
        </main>

        {/* Modern Footer */}
        <Footer />

        {/* Scroll to top button */}
        <ScrollToTop />

        {/* Brutalism Demo Modal */}
        <BrutalismDemo />
      </div>
    </>
  );
}

export default App;
