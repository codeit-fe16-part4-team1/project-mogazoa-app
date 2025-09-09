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
import SearchInput from './SearchInput';

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
      const params = new URLSearchParams(searchParams.toString());

      if (newQuery) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }
      const queryString = params.toString();
      const newUrl = queryString ? `/?${queryString}` : '/';
      router.push(newUrl);
    }, DEBOUNCE_TIME);
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

  const handleLogoClick = () => {
    router.push('/');
    router.refresh();
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
            <div ref={searchRef} className='absolute top-0 right-0 left-16 z-40 bg-white md:hidden'>
              <div className='flex h-16 items-center px-4'>
                <div className='flex-1'>
                  <SearchInput
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                    onClear={() => {
                      setLocalSearchQuery('');
                      toggleSearch();
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className='flex items-center'>
            <div className='h-8 w-32 cursor-pointer md:h-10 md:w-40' onClick={handleLogoClick}>
              <IconLogo className='h-full w-full' />
            </div>
          </div>
          <div className='flex items-center md:gap-7 lg:gap-15'>
            <button className='cursor-pointer md:hidden' onClick={toggleSearch}>
              <IconSearch className='h-6 w-6 text-gray-500 hover:text-gray-800' />
            </button>
            <div className='hidden h-13 h-14 w-75 md:flex lg:w-125'>
              <SearchInput
                value={localSearchQuery}
                onChange={handleSearchChange}
                onClear={() => {
                  setLocalSearchQuery('');
                }}
              />
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
  );
};

export default Header;
