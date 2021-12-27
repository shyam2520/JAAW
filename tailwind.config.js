module.exports = {
  ppurge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
      },
      fontFamily:{
        'Carousel-text':['Poppins', 'sans-serif'],
        // 'Carousel-header':[]
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};