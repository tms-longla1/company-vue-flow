import colors from './src/assets/styles/theme/colors'

/** @type {import('tailwindcss').Config} */
export default {
  important: '#app',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors
      }
    }
  },
  plugins: []
}
