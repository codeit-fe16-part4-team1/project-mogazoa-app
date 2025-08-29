'use client';

import AuthSection from '@/app/(auth)/components/AuthSection';
import FormTitle from '@/app/(auth)/components/FormTitle';
import { Button } from '@/components/Button/Button';
import FormField from '@/components/FormField/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import IconBack from '@/assets/icons/icon_arrow_prev.svg';
import { useRouter } from 'next/navigation';
import { redirectKakaoAuth } from '@/lib/redirectKakaoAuth';

const kakaoSignupSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요') //빈칸 에러메시지
    .max(10, '닉네임은 최대 10자까지 가능해요.'), //닉네임 형식 검사
});

type KakaoSignupFormInputs = z.infer<typeof kakaoSignupSchema>;

const SigninKakao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<KakaoSignupFormInputs>({
    resolver: zodResolver(kakaoSignupSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const handleRedirectSignin = () => {
    router.back();
  };

  const onSubmit = (data: KakaoSignupFormInputs) => {
    redirectKakaoAuth.signup({ state: data.nickname });
  };

  return (
    <AuthSection>
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
    </AuthSection>
  );
};

export default SigninKakao;
