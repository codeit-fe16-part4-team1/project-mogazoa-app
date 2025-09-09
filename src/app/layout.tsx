import type { Metadata, Viewport } from 'next';
import { Providers } from './Providers';
import localFont from 'next/font/local';
import './globals.css';
import GlobalDialog from '@/components/Dialog/core/GlobalDialog';
import Script from 'next/script';
import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import Loading from './loading/loading';
import { CompareProvider } from '@/context/CompareProvider';

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

export const metadata: Metadata = {
  title: {
    template: '%s | mogazoa',
    default: 'mogazoa',
  },
  description: '다양한 상품을 비교하고 정보를 확인하세요',
  icons: '/favicon.svg',
  openGraph: {
    title: '%s | mogazoa',
    description: '다양한 상품을 비교하고 정보를 확인하세요',
    siteName: 'mogazoa',
    locale: 'ko_KR',
    type: 'website',
  },
};

// 별도로 viewport export 추가
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

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
        <Providers>
          <CompareProvider>
            <Suspense fallback={<Loading />}>
              <Header />
              {children}
            </Suspense>
            <GlobalDialog />
          </CompareProvider>
        </Providers>
      </body>
    </html>
  );
}
