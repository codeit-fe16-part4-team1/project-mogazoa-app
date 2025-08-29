'use client';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { AxiosError } from 'axios';

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
      // 기본 에러처리
      if (error) {
        router.replace(`/error?type=${error}`);
        return;
      }
      if (!code) {
        router.replace('/error?type=code_null');
        return;
      }

      try {
        await signinKakao({
          redirectUri,
          token: code,
        });
        router.replace('/');
      } catch (err) {
        console.error('[Error] Failed to Signin by Kakao', err);
        if (err instanceof AxiosError) {
          if (err.status === 403 && err.response?.data.message === '등록되지 않은 사용자입니다.') {
            router.replace('/oauth/signup/kakao');
            return;
          }
          router.replace('/error?type=signin_failed');
        } else {
          router.replace('/error?type=unknown_error');
        }
      }
    };

    handleKakaoSignIn();
  }, [code, error, redirectUri, router, signinKakao]); // 의존성 배열도 추가
  return <div>간편 로그인중...</div>;
};

export default SigninKakaoCallback;
