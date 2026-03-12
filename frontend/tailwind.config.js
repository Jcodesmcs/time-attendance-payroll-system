/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retail theme colors (red/black/white)
        retail: {
          red: '#B91C1C',
          redLight: '#EF4444',
          redDark: '#7F1D1D',
          black: '#1F2937',
          gray: '#6B7280',
          lightGray: '#F3F4F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}