/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "var(--primary-color)",
        // secondary: "var(--secondary-color)",
        // accent: "var(--accent-color)",
        bgc: "rgb(var(--background-color) / <alpha-value>)",
        fgc: "rgb(var(--foreground-color) / <alpha-value>)",
        accent: "rgb(var(--accent-color) / <alpha-value>)",
      },
      animation: {
        "opacity-in": "1s linear 0s forwards 1 opacity-in",
      },
      keyframes: {
        "opacity-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
