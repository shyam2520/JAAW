module.exports = {
  ppurge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'ep-bg':'#5c2d9c',
        'button-disabled':'#3c2464'
      },
      fontFamily:{
        'Carousel-text':['Poppins', 'sans-serif'],
        'Cards-text':['Inter', 'sans-serif']
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};