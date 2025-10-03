import './globals.css';

import Script from 'next/script';

import type { Metadata, Viewport } from 'next';

import { Suspense } from 'react';

import clsx from 'clsx';
import { ToastRender } from 'cy-toast';

import BottomSpacer from '@/components/BottomSpacer/BottomSpacer';
import GlobalDialog from '@/components/Dialog/core/GlobalDialog';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ProductAddButton from '@/components/ProductAddButton/ProductAddButton';
import QuickScrollButton from '@/components/QuickScrollButton/QuickScrollButton';
import { getUserInfo } from '@/lib/getUserInfo';

import { cafe24Supermagic } from './font';
import Loading from './loading/loading';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: {
    template: 'mogazoa',
    default: 'mogazoa',
  },
  description: '다양한 상품을 비교하고 정보를 확인하세요',
  icons: '/favicon.svg',
  openGraph: {
    title: 'mogazoa',
    description: '다양한 상품을 비교하고 정보를 확인하세요',
    images: `https://${process.env.DOMAIN}/images/image_opengraph_wide_mogazoa.png`,
    siteName: 'mogazoa',
    locale: 'ko_KR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = await getUserInfo();

  return (
    <html lang='ko'>
      <head>
        <Script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js'
          integrity='sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm'
          crossOrigin='anonymous'
          strategy='beforeInteractive'
        />
        <link rel='preload' as='image' href='/images/banner_pattern.png' fetchPriority='high' />
      </head>
      <body className={`${cafe24Supermagic.variable} antialiased`}>
        <ToastRender />
        <Providers>
          <Suspense fallback={<Loading />}>
            <Header />
            <ProductAddButton className='fixed right-5 bottom-[calc(17vw+32px)] md:right-8 md:bottom-20 lg:right-[calc((100vw-980px)/2-72px))] lg:bottom-28' />
            <QuickScrollButton
              className={clsx(
                'fixed bottom-[calc(17vw+32px)] md:right-8 lg:right-[calc((100vw-980px)/2-72px))]',
                isAuthenticated
                  ? 'right-25 md:bottom-38 lg:bottom-46'
                  : 'right-5 md:bottom-20 lg:bottom-28',
              )}
            />

            {children}
            <BottomSpacer />
            <Footer />
          </Suspense>
          <GlobalDialog />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
