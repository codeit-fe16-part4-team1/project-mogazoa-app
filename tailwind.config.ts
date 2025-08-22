import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',

        'primary-orange': {
          100: '#fffcf2',
          200: '#ffe59e',
          300: '#ffcb7b',
          400: '#ffb84d',
          500: '#ff9a00',
          600: '#fd7e35',
          700: '#e56611',
          800: '#bf550e',
          900: '#873c0a',
        },
        gray: {
          100: '#f9fafb',
          200: '#eff0f3',
          300: '#dbdce1',
          400: '#c4c6cc',
          500: '#a8abb3',
          600: '#8c8f98',
          700: '#6e727c',
          800: '#4b4f58',
          900: '#2f323a',
        },
        'state-error': '#ff0000',
      },
    },
  },
  plugins: [],
};

export default config;
