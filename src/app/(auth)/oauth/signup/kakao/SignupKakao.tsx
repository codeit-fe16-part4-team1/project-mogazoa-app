'use client';

import FormTitle from '@/app/(auth)/components/FormTitle';
import { Button } from '@/components/Button/Button';
import FormField from '@/components/FormField/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import IconBack from '@/assets/icons/icon_arrow_prev.svg';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { redirectKakaoAuth } from '@/lib/redirectKakaoAuth';

const kakaoSignupSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요') //빈칸 에러메시지
    .max(10, '닉네임은 최대 10자까지 가능해요.'), //닉네임 형식 검사
});

type KakaoSignupFormInputs = z.infer<typeof kakaoSignupSchema>;

interface Props {
  code: string;
  redirectUri: string;
}

const SignupKakao = ({ code, redirectUri }: Props) => {
  const { signupKakao } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<KakaoSignupFormInputs>({
    resolver: zodResolver(kakaoSignupSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const handleRedirectSignin = () => {
    router.push('/signin');
  };

  const onSubmit = async (data: KakaoSignupFormInputs) => {
    try {
      await signupKakao({
        nickname: data.nickname,
        redirectUri,
        token: code,
      });
      router.replace('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        const errorMessage = e.response?.data.message;
        // 닉네임 중복 에러 처리
        console.log(errorMessage);
        if (e.status === 400 && errorMessage === '이미 사용중인 닉네임입니다.') {
          const errorKey = Object.keys(e.response?.data.details)[0];
          if (errorKey === 'nickname') {
            setError('nickname', {
              type: 'manual',
              message: errorMessage,
            });
          }
        }
        if (e.status === 400 && errorMessage === '잘못된 인가 코드입니다.') {
          redirectKakaoAuth.signup({ state: data.nickname });
        }
      } else {
        router.replace('/error?type=unknown_error');
      }
    }
  };

  return (
    <div className='mb-20 flex flex-1 flex-col justify-center md:mb-0 md:flex-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='relative'>
          <IconBack
            className='hover:bg-gray-150 absolute top-0 left-0 w-8 cursor-pointer rounded-md md:w-10'
            onClick={handleRedirectSignin}
          />
          <FormTitle>간편 회원가입</FormTitle>
        </div>
        {/* 닉네임 입력 */}
        <FormField
          label='닉네임'
          id='nickname'
          type='text'
          placeholder='닉네임을 입력해 주세요'
          autoComplete='email'
          register={register('nickname')}
          error={errors.nickname}
          defaultHint='최대 10자 입력이 가능해요'
        />

        {/* 제출 버튼 */}
        <Button
          className='mt-10 w-full md:mt-20 md:h-16'
          type='submit'
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? '가입 중...' : '가입하기'}
        </Button>
      </form>
    </div>
  );
};

export default SignupKakao;
