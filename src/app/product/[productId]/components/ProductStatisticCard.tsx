import { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

const STATISTIC_MAP = {
  rating: {
    title: '별점 평균',
    classifier: '점',
    suffixPlus: '높아요',
    suffixMinus: '낮아요',
  },
  favoriteCount: {
    title: '찜',
    classifier: '개',
    suffixPlus: '많아요',
    suffixMinus: '적어요',
  },
  reviewCount: {
    title: '리뷰',
    classifier: '개',
    suffixPlus: '많아요',
    suffixMinus: '적어요',
  },
};

interface ProductStatisticCardProps extends HTMLAttributes<HTMLDivElement> {
  statistic: 'rating' | 'favoriteCount' | 'reviewCount';
  value: number;
  metricValue: number;
}

const ProductStatisticCard = ({
  className,
  value,
  statistic,
  metricValue,
  ...props
}: ProductStatisticCardProps) => {
  const valueDiff = value - metricValue;
  const isBetterThenCategory = valueDiff >= 0;

  return (
    // 통계 카드 컨테이너
    <div
      className={cn(
        'flex-between-center w-full rounded-[20px] bg-white py-6 pr-8 pl-0 md:flex-col md:px-8',
        'floating-shadow-card',
        className,
      )}
      {...props}
    >
      {/* 통계 */}
      <div className='w-full basis-2/5 border-r border-r-gray-300 text-center md:border-r-0 md:border-b md:border-b-gray-300 md:pb-4'>
        <span className='text-h4-bold md:text-h2-bold mb-2 block text-gray-900'>
          {statistic === 'rating' ? +value.toFixed(1) : +value}
        </span>
        <span className='text-body1-medium block text-gray-700'>
          {STATISTIC_MAP[statistic].title}
        </span>
      </div>
      {/* 카테고리 내 비교 */}
      <p className='text-body2 grow text-center text-gray-600 md:mt-4'>
        같은 카테고리의 제품들보다
        <br />
        <span className='text-gray-900'>
          {Math.abs(+valueDiff.toFixed(1))}
          {STATISTIC_MAP[statistic].classifier}
        </span>{' '}
        더{' '}
        {isBetterThenCategory
          ? STATISTIC_MAP[statistic].suffixPlus
          : STATISTIC_MAP[statistic].suffixMinus}
        !
      </p>
    </div>
  );
};

export default ProductStatisticCard;
