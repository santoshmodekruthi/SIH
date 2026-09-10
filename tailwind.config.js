/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        textMain: '#14213D',
        textMuted: '#64748B',
        primary: '#10B981',
        primaryHover: '#059669',
        borderLight: '#F1F5F9',
        pastel: {
          green: '#ecfdf5',
          blue: '#eff6ff',
          yellow: '#fefce8',
          pink: '#fdf2f8',
          purple: '#faf5ff',
          orange: '#fff7ed'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
