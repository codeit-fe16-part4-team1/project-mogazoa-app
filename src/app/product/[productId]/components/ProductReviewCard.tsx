import ThumbsUpLikes from '@/components/Likes/ThumbsUpLikes';
import Rating from '@/components/Rating/Rating';
import { OrderOptions, Review } from '@/types/api';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/lib/cn';
import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeReview } from '@/api/review/removeReview';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import useDialog from '@/hooks/useDialog';

interface ProductReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  productId: number;
  order: OrderOptions;
  categoryName: string;
  productName: string;
  productImageUrl: string;
  review: Review;
  userId: number;
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
              reviewRemoveMutate(review.id);
            }}
          >
            삭제
          </button>
        )}
        <span className={clsx(reviewInfoTextStyle, 'text-gray-700')}>
          {formatDate(review.createdAt)}
        </span>
      </div>
      {/* 본문 */}
      <p className='text-body1 whitespace-pre-wrap text-gray-900'>{review.content}</p>
      {/* 첨부 이미지 */}
      <div className='flex items-center justify-start gap-3'>
        {review.reviewImages &&
          review.reviewImages.map((image) => (
            <figure key={image.id} className='relative aspect-square size-16 md:size-25'>
              <Image
                className='rounded-3xl object-cover'
                src={image.source}
                alt={`리뷰 이미지 ${image.id}`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // 제대로 공부할 필요
              />
            </figure>
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
