'use client';

import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import AddBtnIcon from '@/assets/icons/icon_plus.svg';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import useDialog from '@/hooks/useDialog';
import { getUserInfo } from '@/lib/getUserInfo';
import { usePathname } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProductAddButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const ProductAddButton = ({ className, ...props }: ProductAddButtonProps) => {
  const { open } = useDialog();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const hiddenPaths = useMemo(() => ['/signin', '/signup'], []);
  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));

  const interactionStyles = 'hover:border-primary-orange-700 hover:border-2';

  useEffect(() => {
    if (isHidden) return;

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setIsAuthenticated(userInfo.isAuthenticated);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setIsAuthenticated(false);
      }
    };

    fetchUserInfo();
  }, [isHidden, pathname]);

  return (
    isAuthenticated &&
    !isHidden && (
      <FloatingButton
        className={cn(
          'bg-primary-orange-600 border-primary-orange-600 size-15',
          interactionStyles,
          className,
        )}
        onClick={() =>
          open({
            dialogName: 'product-form-dialog',
            dialogProps: {
              mode: 'create',
            },
            isBlockBackgroundClose: true,
          })
        }
        {...props}
      >
        <AddBtnIcon className='size-8 fill-white' />
      </FloatingButton>
    )
  );
};

export default ProductAddButton;
