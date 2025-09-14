'use client';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';

const PendingError = () => {
  const handleHomeRedirectClick = () => {
    window.location.reload();
  };

  return (
    <section className='fullscreen flex items-center justify-center'>
      <div className='layout-center'>
        <div className='relative mb-5 aspect-square w-50 md:w-70'>
          <Image fill src='/images/image_error.png' alt='error' className='object-cover' />
        </div>
        <h1 className='text-h3-bold md:text-h1-bold font-cafe24-supermagic mb-10 text-gray-800'>
          요청이 너무 오래 걸리고 있어요. 다시 시도해주세요.
        </h1>
        <Button intent='tertiary' className='w-full md:h-16' onClick={handleHomeRedirectClick}>
          다시 시도
        </Button>
      </div>
    </section>
  );
};

export default PendingError;
