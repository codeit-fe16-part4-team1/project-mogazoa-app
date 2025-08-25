'use client';
import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

const SigninKakaoCallback = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUri = `${origin}${pathname}`;

  const { signupKakao } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const handleKakaoSignUp = async () => {
      if (error) {
        return;
      }
      if (!state) {
        return;
      }
      if (!code) {
        return;
      }

      try {
        await signupKakao({
          nickname: state,
          redirectUri,
          token: code,
        });
      } catch (err) {
        console.error('카카오 회원가입 실패:', err);
      } finally {
        router.replace('/');
      }
    };

    handleKakaoSignUp();
  }, [code, error, redirectUri, router, signupKakao, state]); // 의존성 배열도 추가
  return (
    <Suspense fallback={<div>페이지 로딩 중...</div>}>
      <div>간편 회원가입중...</div>
    </Suspense>
  );
};

export default SigninKakaoCallback;
