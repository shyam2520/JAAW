module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'ep-bg':'#5c2d9c',
        'button-disabled':'#3c2464',
        'ep-no-selected':'#303131',
        'ep-text-no-selected':'#6A828E',
        'ep-list':'#1C1C1C'
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
  plugins: [
    (process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  ],
};