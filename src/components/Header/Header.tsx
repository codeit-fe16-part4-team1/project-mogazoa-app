'use client';
import clsx from 'clsx';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import useAuthStore from '@/store/useAuthStore';
import IconLogo from '@/assets/icons/logo.svg';
import IconMenu from '@/assets/icons/menu.svg';
import IconSearch from '@/assets/icons/search.svg';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import SearchInput from './SearchInput';
import { useCompareStore } from '@/store/useCompareStore';

const HEADER_LINK_STYLES =
  'text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block lg:text-body1 whitespace-nowrap';

const HEADER_ACTIVE_LINK_STYLES =
  'text-body2-bold border-primary-orange-500 text-primary-orange-600 hover:text-border-primary-orange-500 lg:text-body1-bold hidden rounded-full border-1 px-4 py-3 transition-colors duration-300 ease-in-out md:block';

const HEADER_DROPDOWN_LINK_STYLES =
  'block text-body2-medium w-40 px-5 py-3 rounded-[8px] text-gray-600 hover:text-primary-orange-600 hover:bg-primary-orange-200 tracking-[-0.4px]';

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogoClick = () => {
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
        <div className='flex h-16 items-center justify-between md:h-20 lg:h-[100px]'>
          <div className='relative md:hidden' ref={menuRef}>
            <button
              className={clsx(
                'cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden',
                isMenuOpen && 'bg-gray-100',
                'toggle-menu',
              )}
              onClick={toggleMenu}
            >
              <IconMenu />
            </button>
            {isMenuOpen && (
              <div className='z-dropdown absolute top-full left-0 rounded-[8px] bg-white shadow-lg transition-all duration-200 ease-in-out'>
                <div className='space-y-1'>
                  {!isAuthenticated ? (
                    <>
                      <Link
                        href='/signin'
                        className={HEADER_DROPDOWN_LINK_STYLES}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        로그인
                      </Link>
                      <Link
                        href='/signup'
                        className={HEADER_DROPDOWN_LINK_STYLES}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        회원가입
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href='/compare'
                        className={HEADER_DROPDOWN_LINK_STYLES}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {linkText}
                      </Link>
                      <Link
                        href='/profile'
                        className={HEADER_DROPDOWN_LINK_STYLES}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        내 프로필
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* 모바일 검색창 */}
          {isSearchOpen && (
            <div
              ref={searchRef}
              className='z-header-float absolute top-0 right-0 left-16 bg-white md:hidden'
            >
              <div className='flex h-16 items-center px-4'>
                <form className='flex-1' onSubmit={handleSearchSubmit}>
                  <SearchInput
                    value={inputValue}
                    onChange={handleSearchChange}
                    onClear={() => {
                      setInputValue('');
                      setLocalSearchQuery('');
                      toggleSearch();
                    }}
                  />
                </form>
              </div>
            </div>
          )}
          <div className='flex items-center'>
            <div className='h-8 w-32 cursor-pointer md:h-10 md:w-40' onClick={handleLogoClick}>
              <IconLogo className='h-full w-full' />
            </div>
          </div>
          <div className='flex items-center md:gap-4 lg:gap-10'>
            <button className='cursor-pointer md:hidden' onClick={toggleSearch}>
              <IconSearch className='h-6 w-6 text-gray-500 hover:text-gray-800' />
            </button>
            <form className='hidden h-13 h-14 w-75 md:flex lg:w-125' onSubmit={handleSearchSubmit}>
              <SearchInput
                value={inputValue}
                onChange={handleSearchChange}
                onClear={() => {
                  setInputValue('');
                  setLocalSearchQuery('');
                }}
              />
            </form>
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
                <Link
                  href='/signup'
                  className={cn(
                    HEADER_LINK_STYLES,
                    pathname === '/signup' ? HEADER_ACTIVE_LINK_STYLES : '',
                  )}
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/compare'
                  className={cn(
                    HEADER_LINK_STYLES,
                    pathname === '/compare' ? HEADER_ACTIVE_LINK_STYLES : '',
                  )}
                >
                  {linkText}
                </Link>
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
