/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Force **hex** colors → jsPDF can read them
      colors: {
        primary: '#2563eb',   // blue-600
        accent : '#9333ea',   // purple-600
      },
    },
  },
  plugins: [],
}