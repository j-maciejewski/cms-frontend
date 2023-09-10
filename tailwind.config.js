/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      padding: {
        '16/9': '56.25%',
      },
      colors: {
        'cherry-red': {
          light: '#ff394f',
          normal: '#c60016',
          dark: '#8e0010',
        },
        'off-white': '#eee2dc',
        green2: {
          light: '#a9b992',
          normal: '#ad9780',
        },
      },
    },
  },
  plugins: [],
}
