/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030712",
        secondary: '#111827',
        danger: '#DC2626',
        blue: {
          600: '#4F46E5',
          500: '#6366F1',
        },
        cyan: {
          500: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}