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
    <header className={cn('bg-white border-b-1 border-gray-200', 'header')}>
      <div className='max-w-[1680px] mx-auto px-4 sm:px-5'>
        <div className='flex items-center justify-between h-16 md:h-20 lg:h-[100px]'>
          <div className='relative md:hidden' ref={menuRef}>
            <button
              className={cn(
                'md:hidden rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 cursor-pointer',
                'toggle-menu',
              )}
              onClick={toggleMenu}
            >
              <Image src='/menu.svg' alt='메뉴' width={24} height={24} className='w-6 h-6' />
            </button>
            {isMenuOpen && (
              // TODO: 공통 드롭다운 만들어지면 수정
              <div className='absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 transition-all duration-200 ease-in-out'>
                <div className='py-2'>
                  {!isAuthenticated ? (
                    <>
                      <Link
                        href='/signin'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        로그인
                      </Link>
                      <Link
                        href='/signup'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        회원가입
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href='/compare'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        비교하기
                      </Link>
                      <Link
                        href='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
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
            <div ref={searchRef} className='absolute top-0 left-16 right-0 bg-white z-40 md:hidden'>
              <div className='flex items-center h-16 px-4'>
                <div className='relative flex-1'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <Image
                      src='/search.svg'
                      alt='검색'
                      width={24}
                      height={24}
                      className='w-5 h-5'
                    />
                  </div>
                  <input
                    type='text'
                    placeholder='상품 이름을 검색해 보세요'
                    className='block w-full h-12 pl-12 pr-4 py-3 rounded-full bg-[var(--gray-150)] text-sm placeholder-[var(--gray-800)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-orange-600)] focus:border-[var(--primary-orange-600)]'
                    autoFocus
                  />
                </div>
                <button
                  onClick={toggleSearch}
                  className='ml-3 p-2 text-xl text-[var(--gray-500)] hover:text-[var(--gray-800)] cursor-pointer'
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
                className='w-32 h-8 md:w-40 md:h-10'
              />
            </Link>
          </div>
          <div className='flex items-center md:gap-7 lg:gap-15'>
            <button className='md:hidden cursor-pointer' onClick={toggleSearch}>
              <Image src='/search.svg' alt='검색' width={24} height={24} className='w-6 h-6' />
            </button>
            <div className='hidden md:flex w-75 h-13 lg:w-125 h-14'>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
                  <Image
                    src='/search.svg'
                    alt='검색'
                    width={24}
                    height={24}
                    className='w-6 h-6 text-[var(--gray-600)]'
                  />
                </div>
                <input
                  type='text'
                  placeholder='상품 이름을 검색해 보세요'
                  className='block w-full h-full pl-14 pr-4 py-4 rounded-full bg-[var(--gray-150)] text-sm placeholder-[var(--gray-800)] focus:outline-none focus:ring-1 focus:ring-[var(--orange-500)] focus:border-[var(--orange-500)]'
                />
              </div>
            </div>
            {!isAuthenticated ? (
              <>
                <Link
                  href='/signin'
                  className='hidden md:block text-[var(--gray-700)] hover:text-[var(--gray-800)] py-2 text-sm font-medium'
                >
                  로그인
                </Link>
                <Link
                  href='/signup'
                  className='hidden md:block text-[var(--gray-700)] hover:text-[var(--gray-800)] py-2 text-sm font-medium'
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/compare'
                  className='hidden md:block text-[var(--gray-700)] hover:text-[var(--gray-800)] py-2 text-sm font-medium'
                >
                  비교하기
                </Link>
                <Link
                  href='/profile'
                  className='hidden md:block text-[var(--gray-700)] hover:text-[var(--gray-800)] py-2 text-sm font-medium'
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
