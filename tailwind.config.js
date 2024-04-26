/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        black: "#000000",
        orange: "#FF7F50",
        white: "#FFFFFF",
        "light-orange": "#FFD580",
        "dark-purple": "#3A0CA3",
        "light-purple": "#E7CDE1",
        "cream-white": "#F8F6F3",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        opensans: ["Open Sans", "sans-serif"]
      }
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
}

