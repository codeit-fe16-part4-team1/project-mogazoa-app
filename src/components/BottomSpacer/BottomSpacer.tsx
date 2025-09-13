'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const BottomSpacer = () => {
  const pathname = usePathname();
  const hiddenPaths = useMemo(() => ['/signin', '/signup', '/compare'], []);
  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));

  return !isHidden && <div className='h-15' />;
};

export default BottomSpacer;
