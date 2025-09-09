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
    <div className='rounded-x4 flex w-25 flex-col items-center justify-center gap-6 bg-white md:h-[282px] md:w-full lg:w-[405px]'>
      {/* 별점 */}
      <div className='flex w-full items-center justify-center border-b border-gray-200 py-5 text-center md:w-59 md:justify-between'>
        <div className='hidden md:flex'>{spacer}</div>
        <span className='relative inline-flex items-center justify-center'>
          {isRatingWinner && (
            <span className='bg-primary-orange-200 absolute top-1/4 right-0 left-0 h-6 rounded-full'></span>
          )}
          <span className='text-sub-headline-bold md:text-h2-bold z-winner relative px-4'>
            {rating.toFixed(1)}
          </span>
        </span>
        <div className='hidden md:flex'>{isRatingWinner ? winIcon : spacer}</div>
      </div>

      {/* 리뷰 */}
      <div className='flex w-full items-center justify-center border-b border-gray-200 pb-5 text-center md:w-59 md:justify-between'>
        <div className='hidden md:flex'>{spacer}</div>
        <span className='relative inline-flex items-center justify-center'>
          {isReviewCountWinner && (
            <span className='bg-primary-orange-200 absolute top-1/4 right-0 left-0 h-6 rounded-full'></span>
          )}
          <span className='text-sub-headline-bold md:text-h2-bold z-winner relative px-4'>
            {reviewCount}개
          </span>
        </span>
        <div className='hidden md:flex'>{isReviewCountWinner ? winIcon : spacer}</div>
      </div>

      {/* 좋아요 */}
      <div className='flex w-full items-center justify-center pb-5 text-center md:w-59 md:justify-between'>
        <div className='hidden md:flex'>{spacer}</div>
        <span className='relative inline-flex items-center justify-center'>
          {isFavoriteCountWinner && (
            <span className='bg-primary-orange-200 absolute top-1/4 right-0 left-0 h-6 rounded-full'></span>
          )}
          <span className='text-sub-headline-bold md:text-h2-bold z-winner relative px-4'>
            {favoriteCount}개
          </span>
        </span>
        <div className='hidden md:flex'>{isFavoriteCountWinner ? winIcon : spacer}</div>
      </div>
    </div>
  );
};

export default CompareDetail;
