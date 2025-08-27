'use client';

import FormField from '@/components/FormField/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

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
    formState: { errors, isValid },
  } = useForm<KakaoSignupFormInputs>({
    resolver: zodResolver(kakaoSignupSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: KakaoSignupFormInputs) => {
    const redirectUri = `${window.location.origin}/oauth/signup/kakao/callback`;
    Kakao.Auth.authorize({
      redirectUri,
      state: data.nickname,
    });
  };

  return (
    <form
      className='mx-auto max-w-sm space-y-4 rounded-md border p-4 shadow-sm'
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <button
        type='submit'
        disabled={!isValid}
        className='w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-400'
      >
        간편가입
      </button>
    </form>
  );
};

export default SigninKakao;
