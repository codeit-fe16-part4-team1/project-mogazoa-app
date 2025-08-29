'use client';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();

  const handleHomeRedirectClick = () => {
    router.replace('/');
  };

  return (
    <section className='flex min-h-[calc(100vh-124px)] items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative mb-5 aspect-square w-50 md:w-70'>
          <Image fill src='/images/image_error.png' alt='error' className='object-cover' />
        </div>
        <h1 className='text-h3-bold md:text-h1-bold font-cafe24-supermagic mb-10 text-gray-800'>
          비정상적인 접근입니다.
        </h1>
        <Button intent='tertiary' className='w-full md:h-16' onClick={handleHomeRedirectClick}>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
