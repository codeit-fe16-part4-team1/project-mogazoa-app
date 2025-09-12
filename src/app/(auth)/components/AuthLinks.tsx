import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthLinks = () => {
  const pathname = usePathname();
  const listMap = [
    { label: '로그인', href: '/signin' },
    {
      label: '회원가입',
      href: '/signup',
    },
  ];

  return (
    <p className='flex-center mb-10 flex-row font-normal text-gray-900'>
      {listMap.map(({ label, href }, index) => {
        const isActivePath = pathname === href;
        return (
          <div key={label}>
            <Link href={href} className={clsx(isActivePath && 'text-blue-600')}>
              {label}
            </Link>
            {index !== listMap.length - 1 && <span className='px-4'>|</span>}
          </div>
        );
      })}
    </p>
  );
};

export default AuthLinks;
