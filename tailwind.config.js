module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'], // text
      serif: ['Inter', 'sans-serif'], // numbers
    },
    rotate: {
      '-157.5': '-157.5deg',
      '-135': '-135deg',
      '-112.5': '-112.5deg',
      '-90': '-90deg',
      '-67.5': '-67.5deg',
      '-45': '-45deg',
      '-22.5': '-22.5deg',
      '0': '0',
      '22.5': '22.5deg',
      '45': '45deg',
      '67.5': '67.5deg',
      '90': '90deg',
      '112.5': '112.5deg',
      '135': '135deg',
      '157.5': '157.5deg',
      '180': '180deg',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
