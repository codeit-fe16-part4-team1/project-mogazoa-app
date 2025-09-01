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
      <div className='flex w-[234px] items-center justify-between border-b border-gray-200 py-5 text-center'>
        {isRatingWinner ? spacer : spacer}
        <span
          className={`text-h2-bold relative inline-flex items-center justify-center ${isRatingWinner ? 'h-6 rounded-full bg-orange-200 py-5' : ''}`}
        >
          {rating.toFixed(1)}
        </span>
        {isRatingWinner ? winIcon : spacer}
      </div>
      {/* 리뷰 */}
      <div className='flex w-[234px] items-center justify-between border-b border-gray-200 pb-5 text-center'>
        {isRatingWinner ? spacer : spacer}
        <span
          className={`text-h2-bold relative inline-flex items-center justify-center ${isReviewCountWinner ? 'h-6 rounded-full bg-orange-200 py-5' : ''}`}
        >
          {reviewCount}개
        </span>
        {isReviewCountWinner ? winIcon : spacer}
      </div>
      {/* 좋아요 */}
      <div className='flex w-[234px] items-center justify-between pb-5 text-center'>
        {isFavoriteCountWinner ? spacer : spacer}
        <span
          className={`text-h2-bold relative inline-flex items-center justify-center ${isFavoriteCountWinner ? 'h-6 rounded-full bg-orange-200 py-5' : ''}`}
        >
          {favoriteCount}개
        </span>
        {isFavoriteCountWinner ? winIcon : spacer}
      </div>
    </div>
  );
};

export default CompareDetail;
