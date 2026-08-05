import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          1: "#0F3040",
          2: "#464858",
          3: "#A56F63",
          4: "#D99B7F",
        },
        background: "#FAF2EE",
        primary: {
          DEFAULT: "#0F3040",
          hover: "#0A222E",
          light: "#464858",
        },
        secondary: {
          DEFAULT: "#464858",
          light: "#A56F63",
        },
        accent: {
          DEFAULT: "#D99B7F",
          dark: "#A56F63",
          light: "#FAF2EE",
          gold: "#A56F63",
          "gold-light": "#D99B7F",
        },
        text: {
          DEFAULT: "#0F3040",
          muted: "#464858",
          light: "#6B7280",
        },
        border: "#EADAD2",
        card: "rgba(255, 255, 255, 0.95)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        "luxury-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
        glass: "0 8px 32px 0 rgba(31, 41, 55, 0.04)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
