import { useEffect, useState } from 'react';

/**
 * 현재 화면이 데스크톱 크기인지 확인하는 커스텀 훅
 * @param breakpoint - 데스크톱으로 간주할 최소 너비 (기본값: 1024px, Tailwind의 lg breakpoint)
 * @returns isDesktop - 현재 화면이 데스크톱 크기인지 여부
 */
export const useIsDesktop = (breakpoint: number = 1024): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    checkIsDesktop();

    window.addEventListener('resize', checkIsDesktop);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, [breakpoint]);

  return isDesktop;
};
