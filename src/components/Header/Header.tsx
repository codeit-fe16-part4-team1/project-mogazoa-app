'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import useAuthStore from '@/store/useAuthStore';
import IconLogo from '@/assets/icons/logo.svg';
import IconMenu from '@/assets/icons/menu.svg';
import IconSearch from '@/assets/icons/search.svg';
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const DEBOUNCE_TIME = 1000;
const HEADER_LINK_STYLES =
  'block text-body2-medium w-40 px-5 py-3 rounded-[8px] text-gray-600 hover:text-primary-orange-600 hover:bg-primary-orange-200 tracking-[-0.4px]';

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
  const previousSearchQueryRef = useRef(searchQuery);

  const updateQuery = useMemo(() => {
    return debounce((newQuery: string) => {
      const params = new URLSearchParams();
      if (newQuery) {
        params.set('query', newQuery);
      }
      const queryString = params.toString();
      const newUrl = queryString ? `/?${queryString}` : '/';
      router.push(newUrl);
    }, DEBOUNCE_TIME);
  }, [router]);

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

  // 컴포넌트 언마운트 시 debounce 함수 정리
  useEffect(() => {
    return () => {
      updateQuery.cancel();
    };
  }, [updateQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalSearchQuery(inputValue);
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

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <header className={clsx('border-b-1 border-gray-200 bg-white', 'header')}>
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
                          className={HEADER_LINK_STYLES}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          로그인
                        </Link>
                        <Link
                          href='/signup'
                          className={HEADER_LINK_STYLES}
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
                    <button
                      onClick={() => {
                        toggleSearch();
                        setLocalSearchQuery('');
                      }}
                      className='absolute inset-y-0 right-0 mr-3 cursor-pointer p-2 text-xl text-gray-500 hover:text-gray-800'
                    >
                      ✕
                    </button>
                  </div>
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
                    className='bg-gray-150 text-body2 block h-full w-full rounded-full py-4 pr-12 pl-14 placeholder-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none'
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                  />
                  {localSearchQuery && (
                    <button
                      onClick={() => {
                        setLocalSearchQuery('');
                      }}
                      className='absolute inset-y-0 right-0 mr-3 cursor-pointer p-2 text-xl text-gray-500 hover:text-gray-800'
                    >
                      ✕
                    </button>
                  )}
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
