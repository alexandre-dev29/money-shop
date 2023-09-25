const { nextui } = require('@nextui-org/react');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    join(
      __dirname,
      '{src,pages,components,app,ui}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: '2px',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui({})],
};
