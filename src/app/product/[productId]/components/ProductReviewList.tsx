import { HTMLAttributes } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/cn';
import { OrderOptions } from '@/types/api';

import { useProductReviewListData } from '../hooks/useProductReviewListData';
import ProductNoReview from './ProductNoReview';
import ProductReviewCard from './ProductReviewCard';

interface ProductReviewListProps extends HTMLAttributes<HTMLDivElement> {
  productId: number;
  order: OrderOptions;
  userId: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
  authenticated: boolean;
}

const ProductReviewList = ({
  className,
  productId,
  userId,
  order,
  categoryName,
  productName,
  productImageUrl,
  authenticated,
  ...props
}: ProductReviewListProps) => {
  const {
    data: reviewList,
    hasNextPage,
    fetchNextPage,
  } = useProductReviewListData(productId, order);
  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage) fetchNextPage();
  });

  return reviewList.length > 0 ? (
    <div className={cn('flex-between-center flex-col gap-5', className)} {...props}>
      {reviewList.map((review) => (
        <ProductReviewCard
          key={review.id}
          productId={productId}
          order={order}
          categoryName={categoryName}
          productName={productName}
          productImageUrl={productImageUrl}
          review={review}
          userId={userId}
          authenticated={authenticated}
        />
      ))}
      {/* Intersection Observer  */}
      <div className='h-10 w-full' ref={observerRef} />
    </div>
  ) : (
    <ProductNoReview className='h-[320px] w-full' />
  );
};

export default ProductReviewList;
