/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Caveat_Brush: ["Caveat Brush", "sans-serif"], // Google Font
        Roboto: ["Roboto", "sans-serif"], // Another Google Font
      },
    },
    animation: {
      "spin-slow": "spin 1s linear infinite",
    },
  },
  plugins: [],
};
