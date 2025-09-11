import TopRanking from './TopRanking';
import { useQuery } from '@tanstack/react-query';
import { getUsersRankingAPI } from '@/api/user/getUsersRankingAPI';
import MidRanking from './MidRanking';
import { cn } from '@/lib/cn';

const RANK7_SM_STYLES = 'gap-4 w-full border-y-1 border-gray-200 px-2 py-4';
const RANK7_MD_STYLES = 'md:gap-y-5 md:gap-x-12 md:border-y-0 md:px-0 md:py-0';
const RANK7_LG_STYLES = 'lg:h-full lg:justify-between';

const UsersRanking = () => {
  const { data: usersRankingData } = useQuery({
    queryKey: ['usersRanking'],
    queryFn: () => getUsersRankingAPI(),
  });
  const usersRankingTop3 = usersRankingData?.slice(0, 3);
  const usersRankingTop7 = usersRankingData?.slice(3, 7);
  return (
    <div className='flex flex-col items-center justify-center gap-8 md:gap-16 lg:flex-row lg:justify-between'>
      <article
        className='top3-ranking flex gap-5 md:items-start md:gap-10 lg:justify-between'
        aria-label='top3 reviewers'
      >
        {usersRankingTop3?.map((user, index) => (
          <TopRanking key={user.id} user={user} index={index} />
        ))}
      </article>
      <div className='hidden self-stretch border-1 border-gray-200 lg:block' />
      <article
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1',
          RANK7_SM_STYLES,
          RANK7_MD_STYLES,
          RANK7_LG_STYLES,
        )}
        aria-label='top7 reviewers'
      >
        {usersRankingTop7?.map((user, index) => (
          <MidRanking
            className={cn(
              index === 0 && 'order-1',
              index === 1 && 'order-3',
              index === 2 && 'order-2',
              index === 3 && 'order-4',
            )}
            key={user.id}
            user={user}
            index={index}
          />
        ))}
      </article>
    </div>
  );
};

export default UsersRanking;
