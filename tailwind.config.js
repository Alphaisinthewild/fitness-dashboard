/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode palette
        dark: {
          950: '#0a0a0a',
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
        },
        // Neon accent
        neon: {
          green: '#00ff41',
          red: '#ff6b6b',
          blue: '#4a9eff',
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
