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

const SigninPage = () => {
  const { signin } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
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
        console.error(Object.keys(e.response?.data.details)[0]);
        console.error(e.response?.data.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div>
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
            placeholder='이메일을 입력해주세요'
            autoComplete='email'
            register={register('email')}
          />
          <FormHint>{errors.email?.message}</FormHint>
        </FormField>
        {/* 비밀번호 입력 */}
        <FormField>
          <FormLabel htmlFor='password'>비밀번호</FormLabel>
          <FormInput
            id='password'
            type='password'
            placeholder='비밀번호를 입력해 주세요'
            autoComplete='current-password'
            register={register('password')}
          />
          <FormHint>{errors.password?.message}</FormHint>
        </FormField>

        {/* 제출 버튼 */}
        <button
          type='submit'
          disabled={isSubmitting || !isValid}
          className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400'
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default SigninPage;
