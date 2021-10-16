module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'], // text
      serif: ['Inter', 'sans-serif'], // numbers
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
