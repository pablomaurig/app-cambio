/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'header-lg': ['22px', '20px'],
        'heading-lg': ['32px', '36px'],
        body: ['1rem', { lineHeight: '1.5' }],
        heading: ['1.25rem', { fontWeight: '600' }],
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        semibold: '600',
      },
      colors: {
        'purple-dark': '#06083F',
        'purple-light': '#E5E5FF',
        purple: '#6439FF',
      },
      margin: {
        overlap: '-8rem',
      },
      padding: {
        overlap: '8rem',
      },
    },
  },
  plugins: [],
};
