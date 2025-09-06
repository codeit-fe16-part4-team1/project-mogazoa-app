import { HTMLAttributes } from 'react';
import ProductReviewCard from './ProductReviewCard';
import { OrderOptions, Review } from '@/types/api';
import { cn } from '@/lib/cn';

interface ProductReviewListProps extends HTMLAttributes<HTMLDivElement> {
  reviewList: Review[];
  productId: number;
  order: OrderOptions;
  userId: number;
}

const ProductReviewList = ({
  className,
  reviewList,
  order,
  productId,
  userId,
  ...props
}: ProductReviewListProps) => {
  return (
    <div className={cn('flex-between-center flex-col gap-5', className)} {...props}>
      {reviewList.map((review) => (
        <ProductReviewCard
          key={review.id}
          productId={productId}
          order={order}
          review={review}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default ProductReviewList;
