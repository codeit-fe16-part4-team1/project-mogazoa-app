import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './styles//*.{css,scss}'],
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

      fontFamily: {
        sans: ['Spoqa Han Sans Neo', 'sans-serif'],
        'cafe24-supermagic': 'var(--font-cafe24-supermagic)',
      },

      fontSize: {
        //Header
        h1: ['32px', { lineHeight: 'auto' }],
        h2: ['28px', { lineHeight: 'auto' }],
        h3: ['24px', { lineHeight: 'auto' }],
        h4: ['20px', { lineHeight: 'auto' }],

        // Body
        'sub-headline': ['18px', { lineHeight: 'auto' }],
        body1: ['16px', { lineHeight: 'auto' }],
        body2: ['14px', { lineHeight: 'auto' }],
        caption: ['12px', { lineHeight: 'auto' }],
      },

      fontWeight: {
        bold: 'bold',
        medium: 500,
        regular: 'normal',
        light: 300,
      },
    },
  },
  plugins: [],
};

export default config;
