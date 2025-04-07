// tailwind.config.js
module.exports = {
  content: [
    "./index.html",                 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  plugins: [
    require("@tailwindcss/typography"),
  ],
  theme: {
    extend: {
      colors:{
        'gray-rgba': 'rgba(245,228,204,0.5)',
        'soft-white': 'rgba(255, 255, 255, 1)'
      },
    },
  },
  plugins: [],
};
