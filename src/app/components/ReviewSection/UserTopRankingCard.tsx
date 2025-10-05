import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';
import { UserRanking } from '@/types/api';

interface Props {
  user: UserRanking;
  ranking: number;
}

const UserTopRankingCard = ({ user, ranking }: Props) => {
  const router = useRouter();

  const { safeImageUrl, onError } = useSafeImageUrl(
    user.image,
    '/images/image_default_profile.png',
  );

  const handleUserInfoClick = (userId: number) => {
    router.push(`user/${userId}`);
  };

  return (
    <div
      className={clsx(
        'group flex cursor-pointer flex-col items-center',
        ranking === 1 && 'order-2',
        ranking === 2 && 'order-1',
        ranking === 3 && 'order-3',
      )}
      onClick={() => handleUserInfoClick(user.id)}
    >
      <div
        className={clsx(
          'relative mb-5',
          ranking === 1 ? 'size-16 md:size-25' : 'size-14 md:size-21',
        )}
      >
        <Image
          src={safeImageUrl}
          sizes='(max-width: 1024px) 50vw, 300px'
          fill
          alt={user.nickname}
          className='rounded-full'
          style={{
            objectFit: 'cover',
          }}
          onError={onError}
        />
      </div>
      <span className='text-body2-medium md:text-sub-headline-bold mb-2 text-gray-900 group-hover:underline'>
        {user.nickname}
      </span>
      <div className='md:text-body2 flex gap-4 text-[11px] text-gray-500'>
        <span>{`팔로워 ${user.followersCount}`}</span>
        <span>{`리뷰 ${user.reviewCount}`}</span>
      </div>
    </div>
  );
};

export default UserTopRankingCard;
