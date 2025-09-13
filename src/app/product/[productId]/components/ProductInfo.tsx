import { cn } from '@/lib/cn';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface ProductInfoProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: number;
  categoryName: string;
  productName: string;
  description: string;
}

const ProductInfo = ({
  className,
  categoryId,
  categoryName,
  productName,
  description,
  ...props
}: ProductInfoProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* 카테고리명 */}
      <div className='mb-2 md:mb-3'>
        <Link href={`/?category=${categoryId}`}>
          <h2 className='text-caption md:text-body2 hover:text-primary-orange-600 hover:text-body2-bold cursor-pointer text-gray-700'>{`${categoryName} >`}</h2>
        </Link>
      </div>
      {/* 상품명 */}
      <div className='mb-3 md:mb-5'>
        <h1 className='text-h4-bold md:text-h3-bold text-gray-900'>{productName}</h1>
      </div>
      {/* 상품 설명 */}
      <div className='mb-5 md:mb-8'>
        <p className='text-body2 md:text-body1 whitespace-pre-wrap text-gray-700'>{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
