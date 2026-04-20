/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

