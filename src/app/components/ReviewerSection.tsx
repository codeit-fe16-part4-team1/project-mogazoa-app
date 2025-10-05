'use client';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getUsersRankingAPI } from '@/api/user/getUsersRankingAPI';

import UserRankingCard from './ReviewSection/UserRankingCard';
import UserTopRankingCard from './ReviewSection/UserTopRankingCard';

const ReviewerSection = () => {
  const { data } = useQuery({
    queryKey: ['usersRanking'],
    queryFn: () => getUsersRankingAPI(),
  });

  const topRanking = data ? data.slice(0, 3) : [];
  const remainRanking = data ? data.slice(3) : [];

  return (
    <section className='mb-15'>
      <h2 className='text-h4-bold font-cafe24-supermagic mb-5 text-gray-900'>리뷰어 랭킹</h2>
      <div className='flex flex-col gap-8 md:gap-15 lg:ml-8 lg:h-53 lg:flex-row lg:items-center'>
        <div className='flex flex-row justify-center gap-5 md:gap-10 lg:w-125 lg:gap-13'>
          {topRanking.map((user, index) => (
            <UserTopRankingCard key={user.id} user={user} ranking={index + 1} />
          ))}
        </div>
        <div className='hidden h-full border-l-1 border-gray-200 lg:block' />
        <div
          className={clsx(
            'grid grid-flow-col grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-1 lg:grid-rows-4',
            'gap-x-12 gap-y-4 border-y-1 border-gray-200 px-2 py-4 md:border-0 md:p-0 lg:grow lg:gap-y-8',
          )}
        >
          {remainRanking.map((user, index) => (
            <UserRankingCard key={user.id} user={user} ranking={index + 4} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewerSection;
