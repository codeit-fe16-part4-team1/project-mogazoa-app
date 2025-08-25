'use client';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import useAuthStore from '@/store/useAuthStore';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isMenuOpen || isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <header className={cn('border-b-1 border-gray-200 bg-white', 'header')}>
      <div className='mx-auto max-w-[1680px] px-4 sm:px-5'>
        <div className='flex h-16 items-center justify-between md:h-20 lg:h-[100px]'>
          <div className='relative md:hidden' ref={menuRef}>
            <button
              className={cn(
                'cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden',
                'toggle-menu',
              )}
              onClick={toggleMenu}
            >
              <Image src='/menu.svg' alt='메뉴' width={24} height={24} className='h-6 w-6' />
            </button>
            {isMenuOpen && (
              // TODO: 공통 드롭다운 만들어지면 수정
              <div className='absolute top-full left-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-in-out'>
                <div className='py-2'>
                  {!isAuthenticated ? (
                    <>
                      <Link
                        href='/signin'
                        className='block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        로그인
                      </Link>
                      <Link
                        href='/signup'
                        className='block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        회원가입
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href='/compare'
                        className='block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        비교하기
                      </Link>
                      <Link
                        href='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900'
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
                <div className='relative flex-1'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                    <Image
                      src='/search.svg'
                      alt='검색'
                      width={24}
                      height={24}
                      className='h-5 w-5'
                    />
                  </div>
                  <input
                    type='text'
                    placeholder='상품 이름을 검색해 보세요'
                    className='block h-12 w-full rounded-full bg-[var(--gray-150)] py-3 pr-4 pl-12 text-sm placeholder-[var(--gray-800)] focus:border-[var(--primary-orange-600)] focus:ring-1 focus:ring-[var(--primary-orange-600)] focus:outline-none'
                    autoFocus
                  />
                </div>
                <button
                  onClick={toggleSearch}
                  className='ml-3 cursor-pointer p-2 text-xl text-[var(--gray-500)] hover:text-[var(--gray-800)]'
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <div className='flex items-center'>
            <Link href='/'>
              <Image
                src='/logo.svg'
                alt='mogazoa'
                width={160}
                height={40}
                className='h-8 w-32 md:h-10 md:w-40'
              />
            </Link>
          </div>
          <div className='flex items-center md:gap-7 lg:gap-15'>
            <button className='cursor-pointer md:hidden' onClick={toggleSearch}>
              <Image src='/search.svg' alt='검색' width={24} height={24} className='h-6 w-6' />
            </button>
            <div className='hidden h-13 h-14 w-75 md:flex lg:w-125'>
              <div className='relative w-full'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5'>
                  <Image
                    src='/search.svg'
                    alt='검색'
                    width={24}
                    height={24}
                    className='h-6 w-6 text-[var(--gray-600)]'
                  />
                </div>
                <input
                  type='text'
                  placeholder='상품 이름을 검색해 보세요'
                  className='block h-full w-full rounded-full bg-[var(--gray-150)] py-4 pr-4 pl-14 text-sm placeholder-[var(--gray-800)] focus:border-[var(--orange-500)] focus:ring-1 focus:ring-[var(--orange-500)] focus:outline-none'
                />
              </div>
            </div>
            {!isAuthenticated ? (
              <>
                <Link
                  href='/signin'
                  className='hidden py-2 text-sm font-medium text-[var(--gray-700)] hover:text-[var(--gray-800)] md:block'
                >
                  로그인
                </Link>
                <Link
                  href='/signup'
                  className='hidden py-2 text-sm font-medium text-[var(--gray-700)] hover:text-[var(--gray-800)] md:block'
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/compare'
                  className='hidden py-2 text-sm font-medium text-[var(--gray-700)] hover:text-[var(--gray-800)] md:block'
                >
                  비교하기
                </Link>
                <Link
                  href='/profile'
                  className='hidden py-2 text-sm font-medium text-[var(--gray-700)] hover:text-[var(--gray-800)] md:block'
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
