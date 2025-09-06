import { HTMLAttributes } from 'react';
import ProductReviewCard from './ProductReviewCard';
import { OrderOptions, Review } from '@/types/api';
import { cn } from '@/lib/cn';

interface ProductReviewListProps extends HTMLAttributes<HTMLDivElement> {
  reviewList: Review[];
  productId: number;
  order: OrderOptions;
  userId: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
}

const ProductReviewList = ({
  className,
  reviewList,
  productId,
  userId,
  order,
  categoryName,
  productName,
  productImageUrl,
  ...props
}: ProductReviewListProps) => {
  return (
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
    </div>
  );
};

export default ProductReviewList;
