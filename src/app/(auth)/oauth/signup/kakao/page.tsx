'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import SignupKakao from './SignupKakao';

type AuthType = 'signin' | 'signup';

const SigninKakao = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUri = `${origin}${pathname}`;

  const [type, setType] = useState<AuthType>('signin');

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
      } catch (e) {
        if (e instanceof AxiosError) {
          const errorMessage = e.response?.data.message;
          if (e.status === 403 && errorMessage === '등록되지 않은 사용자입니다.') {
            setType('signup');
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
  if (type === 'signin') return <div>간편 로그인중...</div>;
  if (!code) return;
  return <SignupKakao code={code} redirectUri={redirectUri} />;
};

export default SigninKakao;
