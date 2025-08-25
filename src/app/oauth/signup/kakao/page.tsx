'use client';

import FormField from '@/components/FormField/FormField';
import FormHint from '@/components/FormField/FormHint';
import FormInput from '@/components/FormField/FormInput';
import FormLabel from '@/components/FormField/FormLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const kakaoSignupSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임은 필수 입력입니다.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.'),
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
      className='max-w-sm mx-auto p-4 space-y-4 border rounded-md shadow-sm'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* 닉네임 입력 */}
      <FormField>
        <FormLabel htmlFor='nickname'>닉네임</FormLabel>
        <FormInput
          id='nickname'
          type='text'
          placeholder='닉네임을 입력해 주세요'
          register={register('nickname')}
        />
        <FormHint>{errors.nickname?.message}</FormHint>
      </FormField>

      {/* 제출 버튼 */}
      <button
        type='submit'
        disabled={!isValid}
        className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400'
      >
        간편가입
      </button>
    </form>
  );
};

export default SigninKakao;
