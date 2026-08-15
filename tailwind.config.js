/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5A1F2B", // Primary Burgundy
        "primary-dark": "#3B111B", // Deep Burgundy
        cream: "#E6D2B5", // Deep Sandal Cream
        "cream-warm": "#D4BFA0", // Warm Beige
        "cream-light": "#F0E2CC", // Light Sandal
        dark: "#24181A", // Dark Text
        white: "#FFF8ED", // Soft White
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
