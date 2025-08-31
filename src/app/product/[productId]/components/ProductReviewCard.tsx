import ThumbsUpLikes from '@/components/Likes/ThumbsUpLikes';
import Rating from '@/components/Rating/Rating';
import { TextArea } from '@/components/TextArea/TextArea';
import { OrderOptions, Review } from '@/types/api';
import Image from 'next/image';
import { HTMLAttributes, useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/lib/cn';
import clsx from 'clsx';

interface ProductReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  productId: number;
  order: OrderOptions;
  review: Review;
}

const ProductReviewCard = ({
  className,
  productId,
  order,
  review,
  ...props
}: ProductReviewCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const reviewInfoTextStyle = 'text-gray-600 text-caption md:text-body2';
  const editTextStyle = 'cursor-pointer underline underline-offset-2';

  return (
    // 리뷰 카드 컨테이너
    <div
      className={cn(
        'border-gray-150 flex w-full flex-col items-start justify-between gap-3 rounded-[20px] border bg-white px-5 py-7 md:px-10',
        className,
      )}
      {...props}
    >
      {/* 별점, 사용자명, 편집 버튼, 날짜 등 헤더 */}
      <div className='flex-between-center w-full gap-2'>
        {/*  */}
        <Rating rating={review.rating} readonly size='sm' />
        <span className={clsx(reviewInfoTextStyle, 'grow-1')}>{review.user.nickname}</span>
        <button
          className={clsx(reviewInfoTextStyle, editTextStyle)}
          onClick={() => setIsEdit((prev) => !prev)}
        >
          수정
        </button>
        <button className={clsx(reviewInfoTextStyle, editTextStyle)}>삭제</button>
        <span className={clsx(reviewInfoTextStyle, 'text-gray-700')}>
          {formatDate(review.updatedAt)}
        </span>
      </div>
      {/* 본문 */}
      {isEdit ? (
        <TextArea placeholder={review.content} maxLength={1000} />
      ) : (
        <p className='text-body1 whitespace-pre-wrap text-gray-900'>{review.content}</p>
      )}
      {/* 첨부 이미지 */}
      <div className='flex items-center justify-start gap-3'>
        {review.reviewImages &&
          review.reviewImages.map((image) => (
            <div key={image.id} className='relative aspect-square size-16 md:size-25'>
              <Image
                className='rounded-3xl'
                src={image.source}
                alt={`리뷰 이미지 ${image.id}`}
                fill
                objectFit='cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // 제대로 공부할 필요
              />
            </div>
          ))}
      </div>
      {/* 엄지척 좋아요 */}
      <ThumbsUpLikes
        className='self-end'
        productId={productId}
        reviewId={review.id}
        order={order}
        likes={review.likeCount}
        liked={review.isLiked}
      />
    </div>
  );
};

export default ProductReviewCard;
