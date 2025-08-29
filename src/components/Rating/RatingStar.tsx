import { cn } from '@/lib/cn';

import { cva } from 'class-variance-authority';
import { SVGProps } from 'react';
import { RatingStarSize, RatingStarState } from '@/types/rating.types';
import RatingStarIcon from '@/assets/icons/icon_rating_star.svg';

interface RatingStarProps extends SVGProps<SVGSVGElement> {
  state?: RatingStarState;
  size?: RatingStarSize;
}

export const starVariants = cva('transition-all duration-200', {
  variants: {
    state: {
      default: 'fill-gray-300', // 일반 상태 (회색)
      active: 'fill-rating-star-active', // 활성화 상태 (노란색)
      readonly: 'fill-gray-900', // 읽기 전용 상태
    },
    size: {
      sm: 'w-3 h-3 md:w-5 md:h-5',
      md: 'w-7 h-7 md:w-10 md:h-10',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
});

const RatingStar = ({ className, state, size }: RatingStarProps) => {
  return <RatingStarIcon className={cn(starVariants({ state, size }), className)} />;
};

export default RatingStar;
