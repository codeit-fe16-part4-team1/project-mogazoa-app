import { UserRanking } from '@/types/api';
import { cn } from '@/lib/cn';

const MidRanking = ({
  user,
  index,
  className,
}: {
  user: UserRanking;
  index: number;
  className: string;
}) => {
  return (
    <div className={cn('flex items-center justify-between tracking-[-0.4px]', className)}>
      <div className='flex items-center gap-2'>
        <span className='text-caption-medium rounded-[50px] bg-gray-200 px-2 py-1 text-gray-700'>
          {index + 4}등
        </span>
        <span className='md:text-body1 text-body2 text-gray-900'>{user.nickname}</span>
      </div>
      <div className='text-caption flex gap-3 text-right text-gray-500'>
        <div className='followers flex gap-[2px] md:gap-1'>
          <span>팔로워</span>
          <span>{user.followersCount}</span>
        </div>
        <div className='reviews flex gap-[2px] md:gap-1'>
          <span>리뷰</span>
          <span>{user.reviewCount}</span>
        </div>
      </div>
    </div>
  );
};

export default MidRanking;
