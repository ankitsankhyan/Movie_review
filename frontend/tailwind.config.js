/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#272727",
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "light-subtle": "rgba(39, 39, 39, 0.5)",
        "level-1": "#fafafa",
        "level-2": "#e4e5f1",
        "level-3": "#d2d3db",
        "level-4": "#9394a5",
        "level-5": "#484b6a",
      }
    },
  },
  plugins: [],
}

