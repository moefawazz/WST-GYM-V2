/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Raleway': ['Raleway', 'sans-serif'],
      },
      colors: {
        red: '#990000',
        red2: '#99000090',
        wblack: "#333",
      },
    },
  },
  plugins: [],
}

