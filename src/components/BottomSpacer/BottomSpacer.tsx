'use client';

import { usePathname } from 'next/navigation';

import { useMemo } from 'react';

const BottomSpacer = () => {
  const pathname = usePathname();
  const hiddenPaths = useMemo(
    () => ['/signin', '/signup', '/compare', '/product', '/user', '/mypage'],
    [],
  );
  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));

  return !isHidden && <div className='h-15 md:hidden' />;
};

export default BottomSpacer;
