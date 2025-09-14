'use client';

import React, { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import HeartIcon from '@/assets/icons/icon_heart.svg';
import { removeFavoriteProduct } from '@/api/product/removeFavoriteProduct';
import { addFavoriteProduct } from '@/api/product/addFavoriteProduct';
import { useOptimisticMutation } from '@/hooks/useOptimisticMutation';
import { productKeys } from '@/constant/queryKeys';
import { ProductDetail } from '@/types/api';

interface HeartLikesProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heartFavoritedVariants> {
  productId: number;
  authenticated: boolean;
}

const heartFavoritedVariants = cva(
  'size-6 cursor-pointer transition-all duration-200 hover:scale-120 active:text-heart-active',
  {
    variants: {
      favorite: {
        true: 'text-heart-full',
        false: 'text-gray-100',
      },
      authenticated: {
        false: 'text-gray-400 cursor-not-allowed',
      },
    },
    defaultVariants: { favorite: false },
  },
);

type MutaionParams = number;

const HeartLikes = ({
  className,
  productId,
  favorite = false,
  authenticated,
  ...props
}: HeartLikesProps) => {
  const { mutate } = useOptimisticMutation<ProductDetail, ProductDetail, MutaionParams>({
    mutationFn: favorite ? removeFavoriteProduct : addFavoriteProduct,
    queryKey: productKeys.detail(productId),
    updater: (oldData) => ({ ...oldData, isFavorite: !oldData.isFavorite }),
  });

  return (
    <button
      className={cn(heartFavoritedVariants({ favorite, authenticated }), className)}
      {...props}
      onClick={() => mutate(productId)}
      disabled={!authenticated}
      aria-label='좋아요 버튼'
    >
      <HeartIcon className='size-fit fill-current stroke-black stroke-12' />
    </button>
  );
};

export default HeartLikes;
