import { HTMLAttributes } from 'react';
import ProductReviewCard from './ProductReviewCard';
import { OrderOptions } from '@/types/api';
import { cn } from '@/lib/cn';
import { useProductReviewListData } from '../hooks/useProductReviewListData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import ProductNoReview from './ProductNoReview';

interface ProductReviewListProps extends HTMLAttributes<HTMLDivElement> {
  productId: number;
  order: OrderOptions;
  userId: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
}

const ProductReviewList = ({
  className,
  productId,
  userId,
  order,
  categoryName,
  productName,
  productImageUrl,
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
