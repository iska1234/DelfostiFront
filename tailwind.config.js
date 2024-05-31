/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme:{
    extend: {
      colors: {
        primary: {
          default: '#1559F5',
          light: '#56afff',
          dark: '#152C62',
          fullDark: '#18243F',
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
