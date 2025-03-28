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
        'gray-rgba': 'rgba(209, 213, 219,0.5)'
      },
    },
  },
  plugins: [],
};
