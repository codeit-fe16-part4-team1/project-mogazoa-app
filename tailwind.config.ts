import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.svg', './styles//*.{css,scss}'],
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
          150: '#f3f5f7',
          200: '#eff0f3',
          300: '#dbdce1',
          400: '#c4c6cc',
          500: '#a8abb3',
          600: '#8c8f98',
          700: '#6e727c',
          800: '#4b4f58',
          900: '#2f323a',
        },
        'star-full': '#FFC83C',
        'heart-full': '#fda4af',
        'state-error': '#ff0000',
        kakao: '#FEE500',
        'reviewer-ranking-first-badge-text': '#FFFCF2',
        'reviewer-ranking-second-badge-bg': '#E6FAF3',
        'reviewer-ranking-second-badge-text': '#05D58B',
        'reviewer-ranking-third-badge-bg': '#E6E8FA',
        'reviewer-ranking-third-badge-text': '#6B79FA',
      },

      fontFamily: {
        sans: ['Spoqa Han Sans Neo', 'sans-serif'],
        'cafe24-supermagic': 'var(--font-cafe24-supermagic)',
      },

      fontSize: {
        //Header
        h1: ['32px', { lineHeight: '39px', fontWeight: 'normal' }],
        'h1-bold': ['32px', { lineHeight: '39px', fontWeight: 'bold' }],
        'h1-medium': ['32px', { lineHeight: '39px', fontWeight: '500' }],
        'h1-light': ['32px', { lineHeight: '39px', fontWeight: '300' }],

        h2: ['28px', { lineHeight: '34px', fontWeight: 'normal' }],
        'h2-bold': ['28px', { lineHeight: '34px', fontWeight: 'bold' }],
        'h2-medium': ['28px', { lineHeight: '34px', fontWeight: '500' }],
        'h2-light': ['28px', { lineHeight: '34px', fontWeight: '300' }],

        h3: ['24px', { lineHeight: '29px', fontWeight: 'normal' }],
        'h3-bold': ['24px', { lineHeight: '29px', fontWeight: 'bold' }],
        'h3-medium': ['24px', { lineHeight: '29px', fontWeight: '500' }],
        'h3-light': ['24px', { lineHeight: '29px', fontWeight: '300' }],

        h4: ['20px', { lineHeight: '24px', fontWeight: 'normal' }],
        'h4-bold': ['20px', { lineHeight: '24px', fontWeight: 'bold' }],
        'h4-medium': ['20px', { lineHeight: '24px', fontWeight: '500' }],
        'h4-light': ['20px', { lineHeight: '24px', fontWeight: '300' }],

        'sub-headline': ['18px', { lineHeight: '23px', fontWeight: 'normal' }],
        'sub-headline-bold': ['18px', { lineHeight: '23px', fontWeight: 'bold' }],
        'sub-headline-medium': ['18px', { lineHeight: '23px', fontWeight: '500' }],
        'sub-headline-light': ['18px', { lineHeight: '23px', fontWeight: '300' }],

        // Body
        body1: ['16px', { lineHeight: '20px', fontWeight: 'normal' }],
        'body1-bold': ['16px', { lineHeight: '20px', fontWeight: 'bold' }],
        'body1-medium': ['16px', { lineHeight: '20px', fontWeight: '500' }],
        'body1-light': ['16px', { lineHeight: '20px', fontWeight: '300' }],

        body2: ['14px', { lineHeight: '18px', fontWeight: 'normal' }],
        'body2-bold': ['14px', { lineHeight: '18px', fontWeight: 'bold' }],
        'body2-medium': ['14px', { lineHeight: '18px', fontWeight: '500' }],
        'body2-light': ['14px', { lineHeight: '18px', fontWeight: '300' }],

        caption: ['12px', { lineHeight: '15px', fontWeight: 'normal' }],
        'caption-bold': ['12px', { lineHeight: '15px', fontWeight: 'bold' }],
        'caption-medium': ['12px', { lineHeight: '15px', fontWeight: '500' }],
        'caption-light': ['12px', { lineHeight: '15px', fontWeight: '300' }],
      },
      height: {
        'h1-skeleton': '39px',
        'h2-skeleton': '34px',
        'h3-skeleton': '29px',
        'h4-skeleton': '24px',
        'sub-headline-skeleton': '23px',
        'body1-skeleton': '20px',
        'body2-skeleton': '18px',
        'caption-skeleton': '15px',
      },
      borderRadius: {
        x1: '8px',
        x2: '12px',
        x4: '16px',
        x5: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
