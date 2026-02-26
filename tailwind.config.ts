import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mustard: "#C89B3C",
        "mustard-dark": "#A67C28",
        "mustard-light": "#D4A94E",
        cream: "#FAF5EB",
        "cream-dark": "#EDE4D4",
        parchment: "#F5EFE3",
        olive: "#5B6B3C",
        "olive-dark": "#3E4A28",
        "olive-light": "#7A8F55",
        brown: "#6B4423",
        "brown-dark": "#4A2F18",
        "brown-light": "#8B6340",
        warmgray: "#6B5F53",
        ink: "#2C2416",
        "ink-light": "#4A3C2E",
        wine: "#8B3A3A",
        terracotta: "#C05746",
        sand: "#D4C4A8",
      },
      fontFamily: {
        script: ["Monsieur La Doulaise", "cursive"],
        playfair: ["Playfair Display", "serif"],
        sans: ["Source Sans 3", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.25em",
        wider: "0.15em",
      },
      transitionDuration: {
        "600": "600ms",
        "700": "700ms",
      },
    },
  },
  plugins: [],
};
export default config;
