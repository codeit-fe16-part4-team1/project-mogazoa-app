'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import SignupKakao from './SignupKakao';
import { ThreeDotsIndicator } from '@/components/ThreeDotIndicator/ThreeDotIndicator';

type AuthType = 'signin' | 'signup';

const SigninKakao = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUri = `${origin}${pathname}`;

  const [type, setType] = useState<AuthType>('signin');

  const { signinKakao, signupKakao } = useAuthStore();

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
        if (!state) {
          await signinKakao({
            redirectUri,
            token: code,
          });
        } else {
          await signupKakao({
            redirectUri,
            token: code,
            nickname: state,
          });
        }
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
  }, [code, error, redirectUri, router, signinKakao, signupKakao, state]); // 의존성 배열도 추가
  if (type === 'signin')
    return (
      <div className='flex flex-col items-center gap-4 pb-20 md:gap-6 lg:gap-8'>
        <p className='text-h4-bold md:text-h3-bold lg:text-h2-bold text-gray-900'>
          <span className='text-primary-orange-500'>카카오 계정</span>으로 로그인하고 있어요
        </p>
        <p className='text-body md:text-sub-headline lg:text-h4 text-gray-700'>
          잠시만 기다려 주세요
        </p>
        <ThreeDotsIndicator dotColor='primary' className='mt-4' />
      </div>
    );
  if (!code) return;
  return <SignupKakao code={code} redirectUri={redirectUri} />;
};

export default SigninKakao;
