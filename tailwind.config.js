/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme:{
    extend: {
      colors: {
        primary: {
          default: '#DABC59',
          light: '#6A8D9E',
          dark: '#376C86',
          fullDark: '#18485f',
        },
        'background-gray': '#D0CFCD',
        'gray-icons': '#A8A9AD',
        'dark': '#1C1C1C',
      },
    },
  },
  plugins: [
]

}
