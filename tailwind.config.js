/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'airbnb-red': 'rgb(var(--color-airbnb-red) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}