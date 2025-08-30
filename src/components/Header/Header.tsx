'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import useAuthStore from '@/store/useAuthStore';
import IconLogo from '@/assets/icons/logo.svg';
import IconMenu from '@/assets/icons/menu.svg';
import IconSearch from '@/assets/icons/search.svg';
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const DEBOUNCE_TIME = 1000;
const HEADER_LINK_STYLES = 'text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // searchQuery가 외부에서 변경될 때 localSearchQuery 동기화
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const updateQuery = useCallback(
    debounce((newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newQuery) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }
      router.push(`?${params.toString()}`);
    }, DEBOUNCE_TIME),
    [searchParams],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalSearchQuery(inputValue);
    updateQuery(inputValue);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <header className={clsx('border-b-1 border-gray-200 bg-white', 'header')}>
        <div className='mx-auto max-w-[1680px] px-5 md:px-8'>
          <div className='flex h-16 items-center justify-between md:h-20 lg:h-[100px]'>
            <div className='relative md:hidden' ref={menuRef}>
              <button
                className={clsx(
                  'cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden',
                  'toggle-menu',
                )}
                onClick={toggleMenu}
              >
                <IconMenu />
              </button>
              {isMenuOpen && (
                // TODO: 공통 드롭다운 만들어지면 수정
                <div className='absolute top-full left-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out'>
                  <div className='py-2'>
                    {!isAuthenticated ? (
                      <>
                        <Link
                          href='/signin'
                          className='text-body2 block px-4 py-2 text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          로그인
                        </Link>
                        <Link
                          href='/signup'
                          className='text-body2 block px-4 py-2 text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          회원가입
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href='/compare'
                          className={HEADER_LINK_STYLES}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          비교하기
                        </Link>
                        <Link
                          href='/profile'
                          className={HEADER_LINK_STYLES}
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
                className='absolute top-0 right-0 left-16 z-40 bg-white md:hidden'
              >
                <div className='flex h-16 items-center px-4'>
                  <div className='relative flex-1'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                      <IconSearch className='h-6 w-6 text-gray-600' />
                    </div>
                    <input
                      type='text'
                      placeholder='상품 이름을 검색해 보세요'
                      className='bg-gray-150 text-body2 focus:border-primary-orange-500 focus:ring-primary-orange-500 block h-12 w-full rounded-full py-3 pr-4 pl-12 placeholder-gray-800 focus:ring-1 focus:outline-none'
                      value={localSearchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={() => {
                      toggleSearch();
                      setLocalSearchQuery('');
                    }}
                    className='ml-3 cursor-pointer p-2 text-xl text-gray-500 hover:text-gray-800'
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
            <div className='flex items-center'>
              <Link href='/' className='h-8 w-32 md:h-10 md:w-40'>
                <IconLogo className='h-full w-full' />
              </Link>
            </div>
            <div className='flex items-center md:gap-7 lg:gap-15'>
              <button className='cursor-pointer md:hidden' onClick={toggleSearch}>
                <IconSearch className='h-6 w-6 text-gray-500 hover:text-gray-800' />
              </button>
              <div className='hidden h-13 h-14 w-75 md:flex lg:w-125'>
                <div className='relative w-full'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5'>
                    <IconSearch className='h-6 w-6 text-gray-600' />
                  </div>
                  <input
                    type='text'
                    placeholder='상품 이름을 검색해 보세요'
                    className='bg-gray-150 text-body2 block h-full w-full rounded-full py-4 pr-4 pl-14 placeholder-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none'
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {!isAuthenticated ? (
                <>
                  <Link
                    href='/signin'
                    className='text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block'
                  >
                    로그인
                  </Link>
                  <Link
                    href='/signup'
                    className='text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block'
                  >
                    회원가입
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href='/compare'
                    className='text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block'
                  >
                    비교하기
                  </Link>
                  <Link
                    href='/mypage'
                    className='text-body2 hidden py-2 text-gray-700 hover:text-gray-800 md:block'
                  >
                    내 프로필
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </Suspense>
  );
};

export default Header;
