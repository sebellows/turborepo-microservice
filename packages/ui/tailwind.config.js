/** @type {import('tailwindcss').Config} */
const theme = tailwindConfig.theme;

module.exports = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme,
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
