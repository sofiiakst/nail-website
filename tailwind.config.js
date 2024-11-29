/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFFFFF", // White
          100: "#F2F2F2", // Very light gray
          200: "#D9D9D9", // Light gray
          300: "#BFBFBF", // Medium light gray
          400: "#A6A6A6", // Gray
          500: "#8C8C8C", // Medium gray
          600: "#737373", // Darker gray
          700: "#595959", // Dark gray
          800: "#404040", // Very dark gray
          900: "#262626", // Near-black
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
