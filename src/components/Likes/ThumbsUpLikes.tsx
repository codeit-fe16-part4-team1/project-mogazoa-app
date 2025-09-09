import { HTMLAttributes } from 'react';
import ThumbsUpIcon from '@/assets/icons/icon_thumbs_up.svg';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { useOptimisticMutation } from '@/hooks/useOptimisticMutation';
import { removeLikeReview } from '@/api/review/removeLikeReview';
import { addLikeReview } from '@/api/review/addLikeReview';
import { reviewKeys } from '@/constant/queryKeys';
import { OrderOptions, Review, ReviewListResponse } from '@/types/api';

interface ThumbsUpLikesProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof thumbsUpButtonVariants> {
  productId: number;
  reviewId: number;
  order: OrderOptions;
  likes: number;
  liked: boolean;
  authenticated: boolean;
}

const buttonLayoutStyle =
  'flex justify-between items-center w-fit h-8 md:h-10 px-3 py-2 md:px-4 md:py-3 gap-1 border-1 rounded-full';
const buttonStyle = 'cursor-pointer transition-all duration-200';

const thumbsUpButtonVariants = cva(cn(buttonLayoutStyle, buttonStyle), {
  variants: {
    liked: {
      true: 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800',
      false: cn('bg-white text-gray-900 border-gray-300 hover:bg-gray-200'),
    },
    authenticated: {
      false: 'cursor-not-allowed',
    },
  },
  defaultVariants: { liked: false },
});

const thumbsUpIconVariants = cva('size-4 fill-white md:size-5', {
  variants: {
    liked: {
      false: cn('stroke-gray-900'),
    },
  },
  defaultVariants: { liked: false },
});

type MutationParams = number;

type ReviewListResponseWithInfiniteQuery = {
  pages: ReviewListResponse[];
  pageParams: unknown;
};

const ThumbsUpLikes = ({
  className,
  productId,
  reviewId,
  order,
  likes,
  liked = false,
  authenticated,
  ...props
}: ThumbsUpLikesProps) => {
  const { mutate } = useOptimisticMutation<
    Review,
    ReviewListResponseWithInfiniteQuery,
    MutationParams
  >({
    mutationFn: liked ? removeLikeReview : addLikeReview,
    queryKey: reviewKeys.list(productId, order),
    updater: (oldData, mutationReviewId) => {
      const updatedPages = oldData.pages.map((page) => {
        return {
          ...page,
          list: page.list.map((review) => {
            if (review.id === mutationReviewId) {
              return {
                ...review,
                isLiked: !review.isLiked,
                likeCount: review.isLiked ? review.likeCount - 1 : review.likeCount + 1,
              };
            }
            return review;
          }),
        };
      });
      return { ...oldData, pages: updatedPages };
    },
  });

  return (
    <button
      className={cn(thumbsUpButtonVariants({ liked, authenticated }), className)}
      onClick={() => mutate(reviewId)}
      disabled={!authenticated}
      {...props}
    >
      <ThumbsUpIcon className={cn(thumbsUpIconVariants({ liked }))} />
      <span className='text-caption md:text-body2'>도움이 돼요</span>
      <span className='text-caption-bold md:text-body2-bold'>{likes > 999 ? '999+' : likes}</span>
    </button>
  );
};

export default ThumbsUpLikes;
