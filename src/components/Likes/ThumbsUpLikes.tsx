import React, { HTMLAttributes } from 'react';
import ThumbsUpIcon from '@/assets/icons/icon_thumbs_up.svg';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface ThumbsUpLikesProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof thumbsUpButtonVariants> {
  likes: number;
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

const ThumbsUpLikes = ({ className, likes, liked = false, ...props }: ThumbsUpLikesProps) => {
  return (
    <button className={cn(thumbsUpButtonVariants({ liked }), className)} {...props}>
      <ThumbsUpIcon className={cn(thumbsUpIconVariants({ liked }))} />
      <span className='text-caption md:text-body2'>도움이 돼요</span>
      <span className='text-caption-bold md:text-body2-bold'>{likes > 999 ? '999+' : likes}</span>
    </button>
  );
};

export default ThumbsUpLikes;
