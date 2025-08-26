'use client';
import FormField from '@/components/FormField/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요') //빈칸 에러메시지
      .email('이메일 형식으로 작성해 주세요'), //이메일 형식 검사
    nickname: z
      .string()
      .min(1, '닉네임을 입력해주세요') //빈칸 에러메시지
      .max(10, '닉네임은 최대 10자까지 가능해요.'), //닉네임 형식 검사
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요') //빈칸 에러메시지
      .min(8, '비밀번호는 8자 이상 입력해주세요') //비밀번호 형식 검사
      .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능해요'),
    passwordConfirmation: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.') //빈칸 에러메시지
      .min(8, '비밀번호는 8자 이상 입력해주세요') //비밀번호 확인 형식 검사
      .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능해요'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않아요',
    path: ['passwordConfirmation'],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const { signup } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await signup(data);
      router.replace('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(Object.keys(e.response?.data.details)[0]);
        console.error(e.response?.data.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <form
      className='mx-auto max-w-sm space-y-4 rounded-md border p-4 shadow-sm'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        label='이메일'
        id='email'
        type='email'
        placeholder='이메일을 입력해 주세요'
        autoComplete='email'
        register={register('email')}
        error={errors.email}
      />
      <FormField
        label='닉네임'
        id='nickname'
        type='text'
        placeholder='닉네임을 입력해 주세요'
        autoComplete='email'
        register={register('nickname')}
        error={errors.nickname}
      />
      <FormField
        label='비밀번호'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해 주세요'
        autoComplete='new-password'
        register={register('password', {
          onChange: () => {
            const passwordConfirm = getValues('passwordConfirmation');
            if (passwordConfirm) {
              trigger('passwordConfirmation');
            }
          },
        })}
        error={errors.password}
      />
      <FormField
        label='비밀번호 확인'
        id='passwordConfirm'
        type='password'
        placeholder='비밀번호를 다시 한 번 입력해 주세요'
        autoComplete='new-password'
        register={register('passwordConfirmation')}
        error={errors.passwordConfirmation}
      />

      {/* 제출 버튼 */}
      <button
        type='submit'
        disabled={isSubmitting || !isValid}
        className='w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-400'
      >
        {isSubmitting ? '가입 중...' : '가입하기'}
      </button>
    </form>
  );
};

export default SignupPage;
