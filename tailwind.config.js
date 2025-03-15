/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#000000',
        'foreground': '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)'],
      },
    },
  },
  plugins: [],
} 