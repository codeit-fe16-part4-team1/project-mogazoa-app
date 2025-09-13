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
    <div className='flex-center mb-10 flex-row font-normal text-gray-900'>
      {listMap.map(({ label, href }, index) => {
        const isActivePath = pathname === href;
        const isNotLast = index !== listMap.length - 1;
        return (
          <span key={label}>
            <Link
              href={href}
              className={clsx(isActivePath && 'text-primary-orange-600 font-semibold')}
            >
              {label}
            </Link>
            {isNotLast && <span className='px-4'>|</span>}
          </span>
        );
      })}
    </div>
  );
};

export default AuthLinks;
