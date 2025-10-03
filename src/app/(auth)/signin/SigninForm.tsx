'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { toast } from 'cy-toast';
import z from 'zod';

import { Button } from '@/components/Button/Button';
import FormField from '@/components/FormField/FormField';
import Toast from '@/components/Toast/Toast';
import { cn } from '@/lib/cn';
import { redirectKakaoAuth } from '@/lib/redirectKakaoAuth';
import useAuthStore from '@/store/useAuthStore';

import AuthLinks from '../components/AuthLinks';
import Divider from '../components/Divider';
import FormFieldContainer from '../components/FormFieldContainer';
import FormTitle from '../components/FormTitle';
import KakaoButton from '../components/KakaoButton';

const signinSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.') //빈칸 에러메시지
    .email('올바른 이메일 형식을 입력하세요.'), //이메일 형식 검사
  password: z
    .string()
    .min(1, '비밀번호는 필수 입력입니다.') //빈칸 에러메시지
    .min(8, '비밀번호는 최소 8자 이상입니다.'), //비밀번호 형식 검사
});

type SigninFormInputs = z.infer<typeof signinSchema>;

const SigninForm = () => {
  const { signin } = useAuthStore();
  const router = useRouter();

  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SigninFormInputs>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SigninFormInputs) => {
    try {
      await signin(data);
      router.replace('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        const errorKey = Object.keys(e.response?.data.details)[0];
        const errorMessage = e.response?.data.message;
        if (errorKey === 'email' || errorKey === 'password') {
          setError(errorKey, {
            type: 'manual',
            message: errorMessage,
          });
        }
      } else {
        console.error(e);
      }
    }
  };

  const handleKakaoSigninClick = () => {
    redirectKakaoAuth.signin();
  };

  useEffect(() => {
    const error = searchParams.get('error');
    console.log(`error: ${error}`);
    if (error === 'unauthorized') {
      toast.run(({ isClosing, isOpening, index }) => (
        <Toast variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          로그인이 필요한 서비스입니다.
        </Toast>
      ));
      router.push('/signin');
    }
  }, [router, searchParams]);

  return (
    <section
      className={cn(
        'flex flex-1 flex-col justify-between md:flex-auto md:justify-normal',
        'mt-28 md:mt-42 lg:my-10',
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>
          <p>
            쉽게 비교하고
            <br />
            똑똑하게 쇼핑하자
          </p>
        </FormTitle>
        {/* 이메일 입력 */}
        <FormFieldContainer>
          <FormField
            label='이메일'
            id='email'
            type='email'
            placeholder='이메일을 입력해 주세요'
            autoComplete='email'
            register={register('email')}
            error={errors.email}
          />
          {/* 비밀번호 입력 */}
          <FormField
            label='비밀번호'
            id='password'
            type='password'
            placeholder='비밀번호를 입력해 주세요'
            autoComplete='new-password'
            register={register('password')}
            error={errors.password}
          />
        </FormFieldContainer>
        <Button
          className='mt-10 h-12 w-full md:mt-20 md:h-16'
          type='submit'
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <div className='mt-25 flex flex-col gap-6 md:mt-10'>
        <Divider text='SNS로 바로 시작하기' />
        <KakaoButton onClick={handleKakaoSigninClick} />
        <AuthLinks />
      </div>
    </section>
  );
};

export default SigninForm;
