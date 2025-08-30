'use client';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { redirectKakaoAuth } from '@/lib/redirectKakaoAuth';

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
      // 기본 에러처리
      if (error) {
        router.replace(`/error?type=${error}`);
        return;
      }
      if (!state) {
        router.replace('/error?type=state_null');
        return;
      }
      if (!code) {
        router.replace('/error?type=code_null');
        return;
      }

      try {
        await signupKakao({
          nickname: state,
          redirectUri,
          token: code,
        });
        router.replace('/');
      } catch (err) {
        if (err instanceof AxiosError) {
          const errorMsg = err.response?.data.message;
          // 닉네임 중복 에러 처리
          if (err.status === 400 && errorMsg === '이미 사용중인 닉네임입니다.') {
            alert('이미 사용중인 닉네임입니다.\n다른 닉네임을 선택해주세요');
            router.replace('/oauth/signup/kakao');
            return;
          }
          // 이미 회원가입한 유저일 경우 에러처리
          if (err.status === 400 && errorMsg === '이미 등록된 사용자입니다.') {
            alert('이미 가입하셨습니다.\n가입된 계정으로 로그인할까요?');
            redirectKakaoAuth.signin();
            return;
          }
          router.replace('/error?type=signup_failed');
        } else {
          router.replace('/error?type=unknown_error');
        }
      }
    };

    handleKakaoSignUp();
  }, [code, error, redirectUri, router, signupKakao, state]); // 의존성 배열도 추가
  return <div>간편 회원가입중...</div>;
};

export default SigninKakaoCallback;
