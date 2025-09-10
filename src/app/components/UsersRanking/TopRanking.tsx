import { UserRanking } from '@/types/api';
import Image from 'next/image';
import clsx from 'clsx';
import { cn } from '@/lib/cn';
import IconFirstRank from '@/assets/icons/icon_ranking_first.svg';
import { useRouter } from 'next/navigation';

const TOP_1_PROFILE_IMAGE_STYLES = 'w-16 h-16 md:w-25 md:h-25';
const RANKING_TEXT_STYLES = 'md:text-caption-medium text-[10px] font-medium';
const RANKING_BADGE_ROUND_STYLES = 'rounded-full px-1.5 py-1 md:px-2 md:py-1.5';
const RANKING_BADGE_ROUND_POSITIONS = 'absolute -top-1 -left-2 md:top-1 md:-left-1';

const TopRanking = ({ user, index }: { user: UserRanking; index: number }) => {
  const router = useRouter();
  return (
    <div
      className={clsx(
        'group flex flex-col items-center justify-end gap-2 tracking-[-0.4px] whitespace-nowrap md:gap-5',
        index === 0 && 'order-1',
        index === 2 && 'order-2',
      )}
    >
      <div
        className={cn(
          'relative h-14 w-14 cursor-pointer rounded-full md:h-21 md:w-21',
          index === 0 && TOP_1_PROFILE_IMAGE_STYLES,
        )}
        onClick={() => {
          router.push(`/user/${user.id}`);
        }}
      >
        <Image
          src={user.image ? user.image : '/images/noProfile.png'}
          sizes='100'
          alt={user.nickname}
          priority
          fill
          className='rounded-full'
          style={{ objectFit: 'cover' }}
        />
        {index === 0 && (
          <div className='absolute top-0 left-0 h-8 w-8 -translate-x-1/2 transform md:left-3 md:h-11 md:w-11'>
            <IconFirstRank />
            <span
              className={cn(
                'text-reviewer-ranking-first-badge-text absolute top-1 left-1/2 -translate-x-1/2 md:top-2',
                RANKING_TEXT_STYLES,
              )}
            >
              1등
            </span>
          </div>
        )}
        {index === 1 && (
          <span
            className={cn(
              RANKING_TEXT_STYLES,
              RANKING_BADGE_ROUND_STYLES,
              RANKING_BADGE_ROUND_POSITIONS,
              'bg-reviewer-ranking-second-badge-bg text-reviewer-ranking-second-badge-text',
            )}
          >
            {index + 1}등
          </span>
        )}
        {index === 2 && (
          <span
            className={cn(
              RANKING_TEXT_STYLES,
              RANKING_BADGE_ROUND_STYLES,
              RANKING_BADGE_ROUND_POSITIONS,
              'bg-reviewer-ranking-third-badge-bg text-reviewer-ranking-third-badge-text',
            )}
          >
            {index + 1}등
          </span>
        )}
      </div>

      <div
        className={cn('flex flex-col items-center justify-center gap-2', index === 0 && 'gap-1')}
      >
        <div
          className={clsx(
            'text-body2-medium md:text-body1-bold cursor-pointer text-center text-gray-900 group-hover:underline group-hover:underline-offset-2',
            index === 0 && 'md:text-sub-headline-bold',
          )}
          onClick={() => {
            router.push(`/user/${user.id}`);
          }}
        >
          {user.nickname}
        </div>
        <div className='md:text-body2 flex gap-2 text-[11px] text-gray-500 md:gap-4'>
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
    </div>
  );
};

export default TopRanking;
