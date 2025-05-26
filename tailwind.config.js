/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        vintage: {
          // Marrones
          brown: {
            light: "#a87e58",
            DEFAULT: "#8b5e3c",
            dark: "#6e4c30",
          },
          // Mostaza
          mustard: {
            light: "#e3b505",
            DEFAULT: "#c69f26",
            dark: "#a78a21",
          },
          // Verdes apagados
          sage: {
            light: "#94a197",
            DEFAULT: "#768c7a",
            dark: "#5f6f61",
          },
          // Colores complementarios
          cream: "#f3ebd3",
          terracotta: "#d27c54",
          olive: "#4a5240",
        },
        retroPastel: {
          // Rosa pastel (tonos más oscuros para mejor contraste)
          pink: {
            light: "#ffaec0",
            DEFAULT: "#ff8da3",
            dark: "#e56b81",
          },
          // Amarillo pastel natilla (tonos más intensos)
          custard: {
            light: "#ffe9a6",
            DEFAULT: "#ffd34d",
            dark: "#e6b800",
          },
          // Colores complementarios con mejor contraste
          mint: "#92c9a9",
          lavender: "#9d8fc2",
          babyBlue: "#8fc4e5",
          peach: "#ffaa80",
          text: "#3d2c2c",
          background: "#fffaf0",
        },
        brutalism: {
          // Colores primarios brutalism
          red: "#ff6b6b",
          cyan: "#4ecdc4",
          blue: "#45b7d1",
          green: "#96ceb4",
          yellow: "#ffeaa7",
          black: "#000000",
          white: "#ffffff",
          // Sombras y efectos
          shadow: {
            primary: "#ff6b6b",
            secondary: "#4ecdc4",
            tertiary: "#45b7d1",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: ["class", "[data-theme='dark']"],
  // Asegúrate que los nuevos temas sean reconocidos por Tailwind
  retroPastelMode: "[data-theme='retro-pastel']",
  brutalismMode: "[data-theme='brutalism']",
};
