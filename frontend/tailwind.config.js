/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tenor: ["TenorSans", "sans-serif"],
        noto: ["NotoSans", "sans-serif"],
        beto: ["BetoGrande", "sans-serif"],
      },
    },
  },
  plugins: [],
}