'use client';
import FormField from '@/components/FormField/FormField';
import FormHint from '@/components/FormField/FormHint';
import FormInput from '@/components/FormField/FormInput';
import FormLabel from '@/components/FormField/FormLabel';
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
      .min(1, '이메일은 필수 입력입니다.') //빈칸 에러메시지
      .email('올바른 이메일 형식을 입력하세요.'), //이메일 형식 검사
    nickname: z
      .string()
      .min(1, '닉네임은 필수 입력입니다.') //빈칸 에러메시지
      .max(20, '닉네임은 최대 20자까지 가능합니다.'), //닉네임 형식 검사
    password: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.') //빈칸 에러메시지
      .min(8, '비밀번호는 최소 8자 이상입니다.'), //비밀번호 형식 검사
    passwordConfirmation: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.') //빈칸 에러메시지
      .min(8, '비밀번호는 최소 8자 이상입니다.'), //비밀번호 확인 형식 검사
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
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
      className='max-w-sm mx-auto p-4 space-y-4 border rounded-md shadow-sm'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* 이메일 입력 */}
      <FormField>
        <FormLabel htmlFor='email'>이메일</FormLabel>
        <FormInput
          id='email'
          type='email'
          placeholder='이메일을 입력해 주세요'
          autoComplete='email'
          register={register('email')}
        />
        <FormHint>{errors.email?.message}</FormHint>
      </FormField>
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
      {/* 비밀번호 입력 */}
      <FormField>
        <FormLabel htmlFor='password'>비밀번호</FormLabel>
        <FormInput
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
        />
        <FormHint>{errors.password?.message}</FormHint>
      </FormField>
      {/* 비밀번호 확인 입력 */}
      <FormField>
        <FormLabel htmlFor='passwordConfirm'>비밀번호 확인</FormLabel>
        <FormInput
          id='passwordConfirm'
          type='password'
          placeholder='비밀번호를 다시 한 번 입력해 주세요'
          autoComplete='new-password'
          register={register('passwordConfirmation')}
        />
        <FormHint>{errors.passwordConfirmation?.message}</FormHint>
      </FormField>

      {/* 제출 버튼 */}
      <button
        type='submit'
        disabled={isSubmitting || !isValid}
        className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400'
      >
        {isSubmitting ? '회원가입 중...' : '회원가입'}
      </button>
    </form>
  );
};

export default SignupPage;
