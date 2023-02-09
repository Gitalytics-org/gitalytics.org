/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lp: "white",
        dp: "slate-700",
        gitalytics: "#F05133",
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
