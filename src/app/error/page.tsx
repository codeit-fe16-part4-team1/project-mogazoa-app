'use client';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  type?: 'error' | 'timeout';
  message?: string;
}

const BUTTON_TEXT = {
  error: '홈으로 가기',
  timeout: '다시 시도',
};

const ErrorPage = ({ type = 'error', message = '비정상적인 접근입니다.' }: ErrorPageProps) => {
  const router = useRouter();

  const handleHomeRedirectClick = (type: 'error' | 'timeout') => {
    if (type === 'error') {
      router.replace('/');
    } else {
      window.location.reload();
    }
  };

  return (
    <section className='fullscreen flex items-center justify-center'>
      <div className='layout-center'>
        <div className='relative mb-5 aspect-square w-50 md:w-70'>
          <Image fill src='/images/image_error.png' alt='error' className='object-cover' />
        </div>
        <h1 className='text-h3-bold md:text-h1-bold font-cafe24-supermagic mb-10 text-gray-800'>
          {message}
        </h1>
        <Button
          intent='tertiary'
          className='w-full md:h-16'
          onClick={() => handleHomeRedirectClick(type)}
        >
          {BUTTON_TEXT[type]}
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
