import { useRouter } from 'next/navigation';

import { UserRanking } from '@/types/api';

interface Props {
  user: UserRanking;
  ranking: number;
}

const UserRankingCard = ({ user, ranking }: Props) => {
  const router = useRouter();

  const handleUserInfoClick = (userId: number) => {
    router.push(`user/${userId}`);
  };

  return (
    <div
      className='group flex cursor-pointer flex-row items-center gap-2'
      onClick={() => handleUserInfoClick(user.id)}
    >
      <span className='layout-center text-caption-medium inline-block rounded-full bg-gray-200 px-2 py-1 text-gray-700'>{`${ranking}등`}</span>
      <span className='text-body2 md:text-body1 inline-block grow text-gray-900 group-hover:underline'>
        {user.nickname}
      </span>
      <div className='text-caption flex flex-row gap-3 text-gray-500'>
        <span className='inline-block'>{`팔로워 ${user.followersCount}`}</span>
        <span className='inline-block'>{`리뷰 ${user.reviewCount}`}</span>
      </div>
    </div>
  );
};

export default UserRankingCard;
