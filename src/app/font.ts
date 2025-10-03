import localFont from 'next/font/local';

export const cafe24Supermagic = localFont({
  src: [
    {
      path: '../assets/fonts/Cafe24Supermagic-Regular-v1.0.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Cafe24Supermagic-Bold-v1.0.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cafe24-supermagic',
  display: 'swap',
});

export const spoqaSans = localFont({
  src: [
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Thin.woff2',
      weight: '100',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Light.woff2',
      weight: '300',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-spoqa-sans',
  display: 'swap',
});
