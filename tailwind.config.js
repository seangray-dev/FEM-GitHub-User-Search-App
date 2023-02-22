/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        SpaceMono: "'Space Mono', monospace",
      },

      fontSize: {
        "heading-l": ["26px", { lineHeight: "38px" }],
        "heading-m": ["22px", { lineHeight: "33px" }],
        "heading-s": ["16px", { lineHeight: "24px" }],
        "body-m": ["15px", { lineHeight: "25px" }],
        "body-s": ["13px", { lineHeight: "20px" }],
      },

      colors: {
        primary: "#0079FF",
        "primary-hover": "#60ABFF",
        "light-toggle": "#697C9A",
        "light-heading-2": "#4B6A9B",
        "light-heading": "#2B3442",
        "light-bg-2": "#F6F8FF",
        "light-bg": "#FEFEFE",
        "dark-white": "#FFFFFF",
        "dark-bg-2": "#141D2F",
        "dark-bg": "#1E2A47",
        "heading-main": "#222731",
        "theme-toggle-dark-hover": "#90A4D4",
        error: "#F74646",
      },
    },
  },
  plugins: [],
};
