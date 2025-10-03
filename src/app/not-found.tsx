'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';

const NotFoundPage = () => {
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
          페이지를 찾을 수 없습니다.
        </h1>
        <Button intent='tertiary' className='w-full md:h-16' onClick={handleHomeRedirectClick}>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
};

export default NotFoundPage;
