'use client';
import clsx from 'clsx';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import useAuthStore from '@/store/useAuthStore';
import IconLogo from '@/assets/icons/logo.svg';
import IconLogoMobile from '@/assets/icons/logo_mobile.svg';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import SearchInput from './SearchInput';
import { useCompareStore } from '@/store/useCompareStore';

const HEADER_LINK_STYLES =
  'text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block lg:text-body1 whitespace-nowrap';

const HEADER_ACTIVE_LINK_STYLES =
  'text-body2-bold border-primary-orange-500 text-primary-orange-600 hover:text-border-primary-orange-500 lg:text-body1-bold hidden rounded-full border-1 px-4 py-3 transition-colors duration-300 ease-in-out md:block';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const previousSearchQueryRef = useRef(searchQuery);
  const [inputValue, setInputValue] = useState(localSearchQuery);
  const { products } = useCompareStore();
  const compareCount = products.filter(Boolean).length;

  const updateQuery = useMemo(() => {
    return (newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newQuery) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }

      const queryString = params.toString();
      const newUrl = queryString ? `/?${queryString}` : '/';
      router.push(newUrl);
    };
  }, [localSearchQuery]);

  // // searchQuery가 외부에서 변경될 때 localSearchQuery 동기화
  useEffect(() => {
    if (searchQuery !== previousSearchQueryRef.current) {
      setLocalSearchQuery(searchQuery);
      previousSearchQueryRef.current = searchQuery;
    }
  }, [searchQuery]);

  useEffect(() => {
    if (localSearchQuery !== previousSearchQueryRef.current) {
      updateQuery(localSearchQuery);
    }
  }, [localSearchQuery, updateQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const handleLogoClick = () => {
    setInputValue('');
    setLocalSearchQuery('');

    router.push('/');
    router.refresh();
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalSearchQuery(inputValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }

      if (
        !localSearchQuery &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isMenuOpen || isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen, localSearchQuery]);

  const linkText = compareCount > 0 ? `비교하기 (${compareCount}/2)` : '비교하기';

  return (
    <header className={clsx('z-header sticky top-0 border-b-1 border-gray-200 bg-white', 'header')}>
      <div className='mx-auto max-w-[1680px] px-5 md:px-8'>
        <div className='flex h-16 w-full items-center md:h-20 md:justify-between lg:h-[100px]'>
          {/* <div className='flex items-center'> */}
          <div
            className='hidden h-8 w-32 cursor-pointer md:block md:h-10 md:w-40'
            onClick={handleLogoClick}
          >
            <IconLogo className='h-full w-full' />
          </div>
          <div className='mr-5 size-8 cursor-pointer md:hidden' onClick={handleLogoClick}>
            <IconLogoMobile className='h-full w-full' />
          </div>
          {/* </div> */}
          <div className='flex flex-1 items-center md:flex-none md:gap-4 lg:gap-10'>
            <form
              className='flex h-12 flex-1 items-center md:h-12.5 md:min-w-75 md:flex-none lg:h-14 lg:w-125'
              onSubmit={handleSearchSubmit}
            >
              <SearchInput
                className='h-full w-full'
                value={inputValue}
                onChange={handleSearchChange}
                onClear={() => {
                  setInputValue('');
                  setLocalSearchQuery('');
                }}
              />
            </form>
            <Link
              href='/compare'
              className={cn(
                HEADER_LINK_STYLES,
                pathname === '/compare' ? HEADER_ACTIVE_LINK_STYLES : '',
              )}
            >
              {linkText}
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  href='/signin'
                  className={cn(
                    HEADER_LINK_STYLES,
                    pathname === '/signin' ? HEADER_ACTIVE_LINK_STYLES : '',
                  )}
                >
                  로그인
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/mypage'
                  className={cn(
                    HEADER_LINK_STYLES,
                    pathname === '/mypage' ? HEADER_ACTIVE_LINK_STYLES : '',
                  )}
                >
                  내 프로필
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
