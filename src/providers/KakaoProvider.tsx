'use client';

import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const KakaoProvider = ({ children }: Props) => {
  useEffect(() => {
    const initializeKakao = () => {
      const JS_APP_KEY = process.env.NEXT_PUBLIC_JS_KEY_KAKAO;

      if (!JS_APP_KEY) {
        console.error(
          '[Error] Kakao JavaScript key is required. Please set variable: NEXT_PUBLIC_JS_KEY_KAKAO',
        );
        return;
      }
      console.log('[DEBUG] Initializing Kakao SDK with key...');
      window.Kakao.init(JS_APP_KEY);
      const isInitialized = window.Kakao.isInitialized();
      if (!isInitialized) {
        console.error('[Error] Failed to initialize Kakao SDK. Please check your app key.');
        return;
      }
      console.log('[DEBUG] Kakao SDK successfully initialized');
    };
    initializeKakao();
  }, []);

  return <>{children}</>;
};
