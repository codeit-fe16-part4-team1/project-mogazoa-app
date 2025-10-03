import { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type ProductDetailHeaderProps = HTMLAttributes<HTMLDivElement>;

const ProductDetailHeader = ({ className, children, ...props }: ProductDetailHeaderProps) => {
  return (
    <div className={cn('flex-between-center', className)} {...props}>
      {children}
    </div>
  );
};

export default ProductDetailHeader;
