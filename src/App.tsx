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
import { usePortfolioDataFromLocales } from "./hooks/usePortfolioDataFromLocales";
import { useScrollToSection } from "./hooks/useScrollToSection";

import "./App.css";

// Test deployment - 2025-06-10 18:19

function App() {
  const { data: portfolioData } = usePortfolioDataFromLocales();
  const { scrollToSection } = useScrollToSection();

  useEffect(() => {
    // Smooth scroll behavior for anchor links with navigation offset
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        scrollToSection(target.hash);
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

  useEffect(() => {
    const titles = [
      "PORTFOLIO - Test Deploy 2025-01-10",
      portfolioData?.presentation?.title || "Frontend React Engineer",
    ];
    let currentTitleIndex = 0;
    let currentIndex = 0;
    let currentTitle = "";
    let isDeleting = false;
    let cycleCount = 0; // Track how many titles we've completed
    const typingSpeed = 150; // ms
    const deletingSpeed = 100; // ms
    const pauseBetweenTitles = 1000; // ms pause between titles
    const pauseAtEnd = 2000; // ms pause at the end of full title

    const animateTitle = () => {
      const currentTargetTitle = titles[currentTitleIndex];

      if (isDeleting) {
        currentTitle = currentTargetTitle.substring(0, currentIndex);
        currentIndex--;

        if (currentIndex < 0) {
          isDeleting = false;
          currentIndex = 0;
          cycleCount++;

          // If we've shown both titles once, stop here
          if (cycleCount >= titles.length) {
            document.title =
              portfolioData?.presentation?.title || "Frontend React Engineer";
            return;
          }

          // Move to next title
          currentTitleIndex = (currentTitleIndex + 1) % titles.length;

          // Pause before starting to type the next title
          setTimeout(() => {
            requestAnimationFrame(animateTitleLoop);
          }, pauseBetweenTitles);
          return;
        }
      } else {
        currentTitle = currentTargetTitle.substring(0, currentIndex + 1);
        currentIndex++;

        if (currentIndex === currentTargetTitle.length) {
          document.title = currentTitle; // Display full title before pause

          // Pause at the end before deleting
          setTimeout(() => {
            isDeleting = true;
            requestAnimationFrame(animateTitleLoop);
          }, pauseAtEnd);
          return;
        }
      }

      // Add cursor effect
      document.title = currentTitle + "_";

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(animateTitleLoop, speed);
    };

    const animateTitleLoop = () => {
      requestAnimationFrame(animateTitle);
    };

    const timeoutId = setTimeout(animateTitleLoop, 1000); // Initial delay before starting

    // Cleanup on component unmount
    return () => {
      clearTimeout(timeoutId);
      document.title = "PORTFOLIO"; // Reset title on unmount
    };
  }, [portfolioData]);

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
      </div>
    </>
  );
}

export default App;
// Test deployment - Tue, Jun 10, 2025  6:26:47 PM
// Force cache refresh - Tue, Jun 10, 2025  6:34:57 PM
// Test deployment with correct capitalization - Tue, Jun 10, 2025  7:00:09 PM
