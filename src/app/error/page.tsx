'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';

const ErrorPage = () => {
  const router = useRouter();

  const handleHomeRedirectClick = () => {
    router.replace('/');
  };

  return (
    <section className='fullscreen flex items-center justify-center'>
      <div className='layout-center'>
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
