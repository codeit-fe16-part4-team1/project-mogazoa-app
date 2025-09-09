import { UserRanking } from '@/types/api';
import { cn } from '@/lib/cn';
import { useRouter } from 'next/navigation';

const MidRanking = ({
  user,
  index,
  className,
}: {
  user: UserRanking;
  index: number;
  className: string;
}) => {
  const router = useRouter();
  return (
    <div className={cn('flex items-center justify-between tracking-[-0.4px]', className)}>
      <div className='flex items-center gap-2'>
        <span className='text-caption-medium rounded-full bg-gray-200 px-2 py-1 text-gray-700'>
          {index + 4}등
        </span>
        <span
          className='md:text-body1 text-body2 cursor-pointer text-gray-900 hover:underline hover:underline-offset-2'
          onClick={() => {
            router.push(`/user/${user.id}`);
          }}
        >
          {user.nickname}
        </span>
      </div>
      <div className='text-caption flex gap-3 text-right text-gray-500'>
        <div className='followers flex gap-0.5 md:gap-1'>
          <span>팔로워</span>
          <span>{user.followersCount}</span>
        </div>
        <div className='reviews flex gap-0.5 md:gap-1'>
          <span>리뷰</span>
          <span>{user.reviewCount}</span>
        </div>
      </div>
    </div>
  );
};

export default MidRanking;
