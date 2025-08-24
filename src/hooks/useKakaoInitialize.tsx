import { useEffect } from 'react';

const useKakaoInitialize = () => {
  useEffect(() => {
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
  }, []);
};

export default useKakaoInitialize;
