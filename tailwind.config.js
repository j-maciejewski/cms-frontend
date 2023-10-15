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
      keyframes: {
        'infinite-spin': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        },
      },
      animation: {
        'infinite-spin': 'infinite-spin 2s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      padding: {
        '16/9': '56.25%',
      },
      colors: {
        'primary': '#8e8d8a',
      },
    },
  },
  plugins: [],
}
