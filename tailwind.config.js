/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '30em', // 480
      sm: '48em', // 768
      md: '64em', // 1024
      lg: '74em', // 1184
      xl: '90em' // 1440
    }
  },
  plugins: [require('@tailwindcss/nesting')],
  corePlugins: {
    preflight: false
  }
}
