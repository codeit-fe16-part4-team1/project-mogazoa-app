import localFont from 'next/font/local';

export const cafe24Supermagic = localFont({
  src: [
    {
      path: '../../public/fonts/Cafe24Supermagic-Regular-v1.0.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Cafe24Supermagic-Bold-v1.0.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cafe24-supermagic',
  display: 'swap',
});
