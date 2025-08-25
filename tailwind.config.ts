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

        h1: ['32px', { lineHeight: 'auto', fontWeight: 'normal' }],
        h2: ['28px', { lineHeight: 'auto', fontWeight: 'normal' }],
        h3: ['24px', { lineHeight: 'auto', fontWeight: 'normal' }],
        h4: ['20px', { lineHeight: 'auto', fontWeight: 'normal' }],

        'h1-bold': ['32px', { lineHeight: 'auto', fontWeight: 'bold' }],
        'h2-bold': ['28px', { lineHeight: 'auto', fontWeight: 'bold' }],
        'h3-bold': ['24px', { lineHeight: 'auto', fontWeight: 'bold' }],
        'h4-bold': ['20px', { lineHeight: 'auto', fontWeight: 'bold' }],

        'h1-medium': ['32px', { lineHeight: 'auto', fontWeight: '500' }],
        'h2-medium': ['28px', { lineHeight: 'auto', fontWeight: '500' }],
        'h3-medium': ['24px', { lineHeight: 'auto', fontWeight: '500' }],
        'h4-medium': ['20px', { lineHeight: 'auto', fontWeight: '500' }],

        'h1-light': ['32px', { lineHeight: 'auto', fontWeight: '300' }],
        'h2-light': ['28px', { lineHeight: 'auto', fontWeight: '300' }],
        'h3-light': ['24px', { lineHeight: 'auto', fontWeight: '300' }],
        'h4-light': ['20px', { lineHeight: 'auto', fontWeight: '300' }],

        // Body
        'sub-headline': ['18px', { lineHeight: 'auto', fontWeight: 'normal' }],
        body1: ['16px', { lineHeight: 'auto', fontWeight: 'normal' }],
        body2: ['14px', { lineHeight: 'auto', fontWeight: 'normal' }],
        caption: ['12px', { lineHeight: 'auto', fontWeight: 'normal' }],

        'sub-headline-bold': ['18px', { lineHeight: 'auto', fontWeight: 'bold' }],
        'body1-bold': ['16px', { lineHeight: 'auto', fontWeight: 'bold' }],
        'body2-bold': ['14px', { lineHeight: 'auto', fontWeight: 'bold' }],
        'caption-bold': ['12px', { lineHeight: 'auto', fontWeight: 'bold' }],

        'sub-headline-medium': ['18px', { lineHeight: 'auto', fontWeight: '500' }],
        'body1-medium': ['16px', { lineHeight: 'auto', fontWeight: '500' }],
        'body2-medium': ['14px', { lineHeight: 'auto', fontWeight: '500' }],
        'caption-medium': ['12px', { lineHeight: 'auto', fontWeight: '500' }],

        'sub-headline-light': ['18px', { lineHeight: 'auto', fontWeight: '300' }],
        'body1-light': ['16px', { lineHeight: 'auto', fontWeight: '300' }],
        'body2-light': ['14px', { lineHeight: 'auto', fontWeight: '300' }],
        'caption-light': ['12px', { lineHeight: 'auto', fontWeight: '300' }],
      },
    },
  },
  plugins: [],
};

export default config;
