'use client';
import IconLogo from '@/assets/icons/logo.svg';

const Loading = () => {
  return (
    <section className='fullscreen layout-center flex flex-col items-center justify-center gap-6'>
      <IconLogo className='h-15 w-60 animate-pulse' />
    </section>
  );
};

export default Loading;
