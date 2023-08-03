/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.css.{html,js,css} ",
    './views/**/*.ejs'],
  theme: {
  extend: {},
  },
  plugins: [
  {
  tailwindcss: {},
  autoprefixer: {},
  },
  ],
  };