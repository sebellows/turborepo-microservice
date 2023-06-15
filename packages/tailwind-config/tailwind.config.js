const { theme } = require("@trms/theme");

module.exports = {
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme,
};
