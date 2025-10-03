import Image from 'next/image';

import { HTMLAttributes } from 'react';

import EmptyReviewImg from '@/assets/img_empty_review.png';
import { cn } from '@/lib/cn';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProductNoReview extends HTMLAttributes<HTMLDivElement> {}

const ProductNoReview = ({ className, ...props }: ProductNoReview) => {
  return (
    <div className={cn('flex-center bg-gray-150 flex-col gap-5 rounded-4xl', className)} {...props}>
      <figure className='relative h-28 w-24'>
        <Image
          className='object-cover'
          src={EmptyReviewImg}
          alt='리뷰 없음 이미지'
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // 제대로 공부할 필요
        />
      </figure>
      <p className='text-body1-medium text-gray-600'>첫 리뷰를 작성해 보세요!</p>
    </div>
  );
};

export default ProductNoReview;
