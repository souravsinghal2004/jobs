// tailwind.config.js
module.exports = {
  darkMode: "class", // ✅ required for `.dark` class to trigger dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
