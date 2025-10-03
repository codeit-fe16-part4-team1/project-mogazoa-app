import Link from 'next/link';

import { HTMLAttributes, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

import { removeReview } from '@/api/review/removeReview';
import ThumbsUpLikes from '@/components/Likes/ThumbsUpLikes';
import Rating from '@/components/Rating/Rating';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import useDialog from '@/hooks/useDialog';
import { cn } from '@/lib/cn';
import { OrderOptions, Review } from '@/types/api';
import { formatDate } from '@/utils/formatDate';

import ProductReviewImage from './ProductReviewImage';

interface ProductReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  productId: number;
  order: OrderOptions;
  categoryName: string;
  productName: string;
  productImageUrl: string;
  review: Review;
  userId: number;
  authenticated: boolean;
}

const ProductReviewCard = ({
  className,
  productId,
  order,
  categoryName,
  productName,
  productImageUrl,
  review,
  userId,
  authenticated,
  ...props
}: ProductReviewCardProps) => {
  const queryClient = useQueryClient();
  const { mutate: reviewRemoveMutate } = useMutation({
    mutationFn: removeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(productId, order) });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
    },
  });

  const { open } = useDialog();

  const [isDeleteMode, setIsDeleteMode] = useState(false);

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
        {/* 별점 */}
        <Rating rating={review.rating} readonly size='sm' />
        {/* 사용자명 */}
        <span className={clsx(reviewInfoTextStyle, 'grow-1')}>
          <Link
            href={{
              pathname: `/user/${review.userId}`,
            }}
          >
            {review.user.nickname}
          </Link>
        </span>

        {/* 리뷰 수정 삭제 버튼 */}
        {isDeleteMode ? (
          <div className='flex gap-2'>
            <span className={clsx(reviewInfoTextStyle, 'text-primary-orange-500 font-semibold')}>
              리뷰를 삭제할까요?
            </span>
            <button
              className={clsx(reviewInfoTextStyle, editTextStyle)}
              onClick={() => {
                reviewRemoveMutate(review.id);
              }}
              aria-label='리뷰 삭제 버튼'
            >
              예
            </button>
            <button
              className={clsx(reviewInfoTextStyle, editTextStyle)}
              onClick={() => setIsDeleteMode(false)}
              aria-label='리뷰 삭제 취소 버튼'
            >
              아니요
            </button>
          </div>
        ) : (
          <>
            {userId === review.userId && (
              <button
                className={clsx(reviewInfoTextStyle, editTextStyle)}
                onClick={() =>
                  open({
                    dialogName: 'review-form-dialog',
                    dialogProps: {
                      mode: 'edit',
                      order,
                      productId,
                      categoryName,
                      productName,
                      productImageUrl,
                      reviewId: review.id,
                      rating: review.rating,
                      reviewContent: review.content,
                      reviewImages: review.reviewImages,
                    },
                    isBlockBackgroundClose: true,
                  })
                }
              >
                수정
              </button>
            )}
            {userId === review.userId && (
              <button
                className={clsx(reviewInfoTextStyle, editTextStyle)}
                onClick={() => {
                  setIsDeleteMode(true);
                }}
              >
                삭제
              </button>
            )}
          </>
        )}

        {/* 작성날짜 */}
        <span className={clsx(reviewInfoTextStyle, 'text-gray-700')}>
          {formatDate(review.createdAt)}
        </span>
      </div>
      {/* 본문 */}
      <p className='text-body1 whitespace-pre-wrap text-gray-900'>{review.content}</p>
      {/* 첨부 이미지 */}
      <div className='flex items-center justify-start gap-3'>
        {review.reviewImages &&
          review.reviewImages.map((image, index) => (
            <ProductReviewImage
              key={image.id}
              source={image.source}
              alt={`${review.user.nickname}님의 ${index}번째 리뷰 이미지`}
            />
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
        authenticated={authenticated}
      />
    </div>
  );
};

export default ProductReviewCard;
