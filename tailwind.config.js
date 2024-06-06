/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          light: 'rgb(120, 69, 172)',
          dark: 'rgb(220, 184, 255)',
        },
        secondary: {
          light: 'rgb(102, 90, 111)',
          dark: 'rgb(208, 193, 218)',
        },
        gray: 'rgb(239, 244, 251)',
      },
      fontSize: {
        'title-xxl': ['44px', '55px'],
        'title-xl': ['36px', '45px'],
        'title-xl2': ['33px', '45px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '30px'],
        'title-md2': ['26px', '30px'],
        'title-sm': ['20px', '26px'],
        'title-xsm': ['18px', '24px'],
      },
    },
  },
  plugins: [],
};
