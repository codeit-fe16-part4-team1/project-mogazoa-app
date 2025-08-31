import { cn } from '@/lib/cn';
import { HTMLAttributes } from 'react';

type ProductInfoHeaderProps = HTMLAttributes<HTMLDivElement>;

const ProductInfoHeader = ({ className, children, ...props }: ProductInfoHeaderProps) => {
  return (
    <div className={cn('flex-between-center', className)} {...props}>
      {children}
    </div>
  );
};

export default ProductInfoHeader;
