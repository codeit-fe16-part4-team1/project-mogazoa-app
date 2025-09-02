import WinIcon from '@/assets/icons/WinIcon.svg';
interface CompareDetailProps {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  isRatingWinner?: boolean;
  isReviewCountWinner?: boolean;
  isFavoriteCountWinner?: boolean;
}

const CompareDetail = ({
  rating,
  reviewCount,
  favoriteCount,
  isRatingWinner,
  isReviewCountWinner,
  isFavoriteCountWinner,
}: CompareDetailProps) => {
  const winIcon = <WinIcon className='h-9 w-9' />;
  const spacer = <div className='h-9 w-9' />;

  return (
    <div className='rounded-x4 flex w-full flex-col items-center justify-center gap-6 bg-white'>
      {/* 별점 */}
      <div className='flex w-59 items-center justify-between border-b border-gray-200 py-5 text-center'>
        {spacer}
        <span className='relative inline-flex items-center justify-center'>
          {isRatingWinner && (
            <span className='absolute top-1/4 right-0 left-0 h-6 rounded-full bg-orange-200'></span>
          )}
          <span className='text-h2-bold z-winner relative px-4'>{rating.toFixed(1)}</span>
        </span>
        {isRatingWinner ? winIcon : spacer}
      </div>

      {/* 리뷰 */}
      <div className='flex w-59 items-center justify-between border-b border-gray-200 pb-5 text-center'>
        {spacer}
        <span className='relative inline-flex items-center justify-center'>
          {isReviewCountWinner && (
            <span className='absolute top-1/4 right-0 left-0 h-6 rounded-full bg-orange-200'></span>
          )}
          <span className='text-h2-bold z-winner relative px-4'>{reviewCount}개</span>
        </span>
        {isReviewCountWinner ? winIcon : spacer}
      </div>

      {/* 좋아요 */}
      <div className='flex w-59 items-center justify-between pb-5 text-center'>
        {spacer}
        <span className='relative inline-flex items-center justify-center'>
          {isFavoriteCountWinner && (
            <span className='absolute top-1/4 right-0 left-0 h-6 rounded-full bg-orange-200'></span>
          )}
          <span className='text-h2-bold z-winner relative px-4'>{favoriteCount}개</span>
        </span>
        {isFavoriteCountWinner ? winIcon : spacer}
      </div>
    </div>
  );
};

export default CompareDetail;
