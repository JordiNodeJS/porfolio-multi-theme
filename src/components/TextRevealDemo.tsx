import { useState } from "react";
import { motion } from "framer-motion";
import { TextRevealAnimation } from "./TextRevealAnimation";
import { useTheme } from "../hooks/useTheme";

const TextRevealDemo = () => {
  const { theme } = useTheme();
  const [replay, setReplay] = useState(false);

  // Force re-render to replay animations
  const handleReplay = () => {
    setReplay(true);
    setTimeout(() => setReplay(false), 100);
  };

  // Different texts for the demo
  const shortText = "Hello World!";
  const mediumText =
    "This is a letter-by-letter animation with staggered reveal.";
  const longText =
    "Each character appears with a subtle scale effect and 80ms delay between them.";

  if (replay) {
    return (
      <div className="h-40 flex items-center justify-center">
        Reloading animations...
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl font-bold mb-8 ${
            theme === "brutalism" ? "brutalism-heading-clean" : "gradient-text"
          }`}
        >
          Text Reveal Animation
        </h2>

        <div className="space-y-12">
          {/* Example 1: Short Text */}
          <div
            className={`p-6 rounded-lg ${
              theme === "brutalism"
                ? "border-4 border-black bg-[#ffeaa7]"
                : theme === "dark"
                ? "bg-slate-800/80 border border-slate-700"
                : "bg-white shadow-lg"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "brutalism" ? "text-black" : ""
              }`}
            >
              Short Text Example
            </h3>
            <div
              className={`text-4xl font-bold ${
                theme === "brutalism"
                  ? "text-black"
                  : theme === "dark"
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              <TextRevealAnimation text={shortText} />
            </div>
          </div>

          {/* Example 2: Medium Text */}
          <div
            className={`p-6 rounded-lg ${
              theme === "brutalism"
                ? "border-4 border-black bg-[#45b7d1]"
                : theme === "dark"
                ? "bg-slate-800/80 border border-slate-700"
                : "bg-white shadow-lg"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "brutalism" ? "text-black" : ""
              }`}
            >
              Medium Text Example
            </h3>
            <div
              className={`text-2xl ${
                theme === "brutalism"
                  ? "text-black font-bold"
                  : theme === "dark"
                  ? "text-white"
                  : "text-slate-800"
              }`}
            >
              <TextRevealAnimation text={mediumText} charDelay={0.05} />
            </div>
          </div>

          {/* Example 3: Long Text */}
          <div
            className={`p-6 rounded-lg ${
              theme === "brutalism"
                ? "border-4 border-black bg-[#96ceb4]"
                : theme === "dark"
                ? "bg-slate-800/80 border border-slate-700"
                : "bg-white shadow-lg"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "brutalism" ? "text-black" : ""
              }`}
            >
              Long Text Example
            </h3>
            <div
              className={`text-lg ${
                theme === "brutalism"
                  ? "text-black font-bold"
                  : theme === "dark"
                  ? "text-gray-300"
                  : "text-slate-700"
              }`}
            >
              <TextRevealAnimation text={longText} charDelay={0.03} />
            </div>
          </div>
        </div>

        {/* Button to replay animations */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReplay}
            className={`px-6 py-3 rounded-lg font-bold ${
              theme === "brutalism"
                ? "brutalism-button text-black border-4 border-black"
                : theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Replay Animations
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TextRevealDemo;
