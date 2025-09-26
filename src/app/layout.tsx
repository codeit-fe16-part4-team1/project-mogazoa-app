import { Providers } from './Providers';
import localFont from 'next/font/local';
import './globals.css';
import GlobalDialog from '@/components/Dialog/core/GlobalDialog';
import Script from 'next/script';
import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import { ToastRender } from 'cy-toast';
import Loading from './loading/loading';

const cafe24Supermagic = localFont({
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${cafe24Supermagic.variable}`}>
      <head>
        <Script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js'
          integrity='sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm'
          crossOrigin='anonymous'
          strategy='beforeInteractive'
        />
      </head>
      <body>
        <ToastRender />
        <Providers>
          <Suspense fallback={<Loading />}>
            <Header />
            {children}
          </Suspense>
          <GlobalDialog />
        </Providers>
      </body>
    </html>
  );
}
