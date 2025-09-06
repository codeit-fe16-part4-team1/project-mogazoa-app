import { FollowListKey, Follows, getUserFollowsAPI } from '@/api/user/getUserFollowsAPI';
import { DialogContent } from '@/components/Dialog/core/DialogComponents';
import { ProfileFollowDialogProps } from '@/types/dialogProps.types';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProfileFollowProfileCard from './components/ProfileFollowProfileCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { profileKeys } from '@/constant/queryKeys';

const ProfileFollowDialog = ({ profileId, followsCount, type }: ProfileFollowDialogProps) => {
  const scrollContainerRef = useRef(null);

  const titleMap = {
    followers: '팔로워',
    followees: '팔로잉',
  };

  const listKeyMap: Record<Follows, FollowListKey> = {
    followers: 'follower',
    followees: 'followee',
  };

  const {
    data: follows,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: profileKeys.follows(profileId, type),
    queryFn: ({ pageParam }) =>
      getUserFollowsAPI({
        userId: profileId,
        type,
        ...(pageParam && { cursor: pageParam }),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // select: (data) => data.pages.flatMap((page) => page.list),
  });

  const fetchObserverRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    {
      root: scrollContainerRef.current,
    },
  );

  const allFollows = follows?.pages.flatMap((page) => page.list) || [];

  return (
    <DialogContent showCloseButton={true}>
      <DialogTitle className='text-sub-headline-medium flex flex-row gap-2 md:text-2xl'>
        {titleMap[type]}
        <p className='text-primary-orange-600'>{followsCount}</p>
      </DialogTitle>
      <DialogDescription className='sr-only'>
        팔로워/팔로우 정보를 확인할 수 있는 대화상자입니다.
      </DialogDescription>
      <div ref={scrollContainerRef} className='flex h-108 flex-col gap-3 overflow-y-auto'>
        {allFollows.map((profile, index) => (
          <div key={profile.id}>
            <ProfileFollowProfileCard
              followUser={profile[listKeyMap[type]]}
              withDivider={index !== allFollows.length - 1}
            />
          </div>
        ))}
        <div ref={fetchObserverRef}>{isFetchingNextPage ? '로딩 중...' : ''}</div>
      </div>
    </DialogContent>
  );
};

export default ProfileFollowDialog;
