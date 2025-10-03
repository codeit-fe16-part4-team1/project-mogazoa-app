'use client';
import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';

import IconCompareDefault from '@/assets/icons/icon_compare_default.svg';
import IconCompareSelected from '@/assets/icons/icon_compare_selected.svg';
import IconHomeDefault from '@/assets/icons/icon_home_default.svg';
import IconHomeSelected from '@/assets/icons/icon_home_selected.svg';
import IconMyDefault from '@/assets/icons/icon_my_default.svg';
import IconMySelected from '@/assets/icons/icon_my_selected.svg';
import { useCompareStore } from '@/store/useCompareStore';

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { products } = useCompareStore();
  const compareCount = products.filter(Boolean).length;
  const linkText = compareCount > 0 ? `비교하기 (${compareCount}/2)` : '비교하기';

  const listMap = [
    { label: '홈', href: '/', IconDefault: IconHomeDefault, IconSelected: IconHomeSelected },
    {
      label: 'MY',
      href: '/mypage',
      IconDefault: IconMyDefault,
      IconSelected: IconMySelected,
    },
    {
      label: linkText,
      href: '/compare',
      IconDefault: IconCompareDefault,
      IconSelected: IconCompareSelected,
    },
  ];

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  return (
    <footer className='z-header fixed right-0 bottom-0 left-0 translate-y-[1px] border-t-1 border-gray-500 bg-white md:hidden'>
      <nav className='flex w-full flex-row items-center justify-between px-[17vw] py-2'>
        {listMap.map(({ label, href, IconDefault, IconSelected }) => {
          const isActivePath = pathname === href;
          const Icon = isActivePath ? IconSelected : IconDefault;
          return (
            <div
              key={href}
              className={clsx(
                'flex flex-col items-center transition-all duration-200 active:scale-90',
              )}
              onClick={() => handleButtonClick(href)}
            >
              <Icon
                className={clsx(
                  'h-[10vw] cursor-pointer',
                  isActivePath ? 'text-primary-orange-600' : 'text-gray-700',
                )}
              />
              <span
                className={clsx(
                  'w-[20vw] text-center text-[clamp(0.6rem,3vw,1.2rem)]',
                  isActivePath ? 'text-primary-orange-600' : 'text-gray-700',
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
