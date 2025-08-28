'use client';

import React, { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import HeartIcon from '@/assets/icons/icon_heart.svg';

interface HeartLikesProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heartLikedVariants> {}

const heartLikedVariants = cva(
  'size-6 cursor-pointer transition-all duration-200 hover:scale-120 active:text-heart-active',
  {
    variants: {
      liked: {
        true: 'text-heart-liked',
        false: 'text-gray-100',
      },
    },
    defaultVariants: { liked: false },
  },
);

const HeartLikes = ({ className, liked = false, ...props }: HeartLikesProps) => {
  return (
    <button className={cn(heartLikedVariants({ liked }), className)} {...props}>
      <HeartIcon className='size-fit fill-current stroke-black stroke-12' />
    </button>
  );
};

export default HeartLikes;
