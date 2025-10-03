'use client';

import { usePathname } from 'next/navigation';

import { HTMLAttributes, useMemo } from 'react';

import IconScrollUp from '@/assets/icons/icon_scroll_up.svg';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import { cn } from '@/lib/cn';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface QuickScrollButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const QuickScrollButton = ({ className, ...props }: QuickScrollButtonProps) => {
  const pathname = usePathname();
  const hiddenPaths = useMemo(() => ['/signin', '/signup', '/compare'], []);
  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));

  const interactionStyles = 'hover:bg-gray-200';

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    !isHidden && (
      <>
        <FloatingButton
          className={cn('size-15 border-gray-500 bg-white', interactionStyles, className)}
          onClick={handleButtonClick}
          aria-label='맨 위로 스크롤'
          {...props}
        >
          <IconScrollUp className='text-primary-orange-700 size-8' />
        </FloatingButton>
      </>
    )
  );
};

export default QuickScrollButton;
