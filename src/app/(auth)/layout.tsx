import { redirect } from 'next/navigation';

import IconFavicon from '@/assets/icons/icon_logo_without_title.svg';
import IconTitle from '@/assets/icons/icon_title.svg';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const { cookies } = await import('next/headers');
  const token = (await cookies()).get('accessToken')?.value;

  if (token) {
    redirect('/');
  }

  return (
    <main className='fullscreen layout-center mx-auto max-w-380 items-stretch px-5 md:gap-10 md:px-18 lg:flex-row-reverse lg:items-center lg:gap-[clamp(0.5rem,10vw,12.5rem)] lg:[&>*]:flex-1'>
      {children}
      <section className='layout-center hidden py-10 md:flex lg:pb-40'>
        <IconFavicon className='mb-4 hidden w-25 lg:block' />
        <IconTitle className='mb-2 hidden w-35 md:block lg:w-60' />
        <p className='font-cafe24-supermagic lg:text-h2-bold hidden text-sm md:inline-block'>
          <span className='text-primary-orange-500'>{'쉽게 '}</span>
          <span className='text-gray-400'>{'비교하고 '}</span>
          <span className='text-primary-orange-500'>{'똑똑하게 '}</span>
          <span className='text-gray-400'>쇼핑하자</span>
        </p>
      </section>
    </main>
  );
};

export default AuthLayout;
