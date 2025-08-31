import { cn } from '@/lib/cn';
import { HTMLAttributes } from 'react';

type ProductDetailHeaderProps = HTMLAttributes<HTMLDivElement>;

const ProductDetailHeader = ({ className, children, ...props }: ProductDetailHeaderProps) => {
  return (
    <div className={cn('flex-between-center', className)} {...props}>
      {children}
    </div>
  );
};

export default ProductDetailHeader;
