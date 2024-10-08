/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#__next',
  theme: {
    extend: {
      backgroundColor: {
        background: 'hsl(var(--background))',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
      textColor: {
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}