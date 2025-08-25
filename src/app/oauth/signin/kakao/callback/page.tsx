'use client';
import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

const SigninKakaoCallback = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUri = `${origin}${pathname}`;

  const { signinKakao } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const handleKakaoSignIn = async () => {
      if (error) {
        return;
      }
      if (!code) {
        return;
      }

      try {
        await signinKakao({
          redirectUri,
          token: code,
        });
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
      } finally {
        router.replace('/');
      }
    };

    handleKakaoSignIn();
  }, [code, error, redirectUri, router, signinKakao]); // 의존성 배열도 추가
  return (
    <Suspense fallback={<div>페이지 로딩 중...</div>}>
      <div>간편 로그인중...</div>
    </Suspense>
  );
};

export default SigninKakaoCallback;
