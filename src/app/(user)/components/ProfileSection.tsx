'use client';
import { Button } from '@/components/Button/Button';
// import useAuthStore from '@/store/useAuthStore';
import ProfileEditButton from './ProfileEditButton';
import ProfileStats from './ProfileStats';
import ProfileImage from './ProfileImage';
import clsx from 'clsx';
import ProfileFollow from './ProfileFollow';
import { Profile } from '@/types/api';
import { useState } from 'react';
import { userFollowAPI } from '@/api/follow/userFollowAPI';
import { userUnFollowAPI } from '@/api/follow/userUnFollowAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  profile: Profile;
  isMyProfile: boolean;
}

const ProfileSection = ({ profile, isMyProfile }: Props) => {
  const queryClient = useQueryClient();

  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);

  // interface MutationParams {
  //   userId: number;
  // }

  // const { mutate, isPending } = useOptimisticMutation<Profile, Profile, MutationParams>({
  //   mutationFn: profile.isFollowing
  //     ? ({ userId }) => userUnFollowAPI({ userId })
  //     : ({ userId }) => userFollowAPI({ userId }),

  //   queryKey: ['profile', profile.id],

  //   updater: (oldData) => ({
  //     ...oldData,
  //     isFollowing: !oldData.isFollowing,
  //   }),
  // });

  const { mutate } = useMutation({
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        await userUnFollowAPI({ userId: profile.id });
      } else {
        await userFollowAPI({ userId: profile.id });
      }
    },
    onMutate: (originalValue) => {
      setIsFollowing(!originalValue);
      return { originalValue }; // context로 원래 값 반환
    },
    onError: (_error, _variables, context) => {
      if (context?.originalValue !== undefined) {
        setIsFollowing(context.originalValue);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
    },
  });

  const handleFollowToggle = () => {
    mutate(isFollowing);
  };

  const BUTTON_STYLES = 'mx-auto block w-full md:h-15 lg:w-160';

  return (
    <section className='rounded-b-4xl bg-white px-5 py-7 md:px-15 md:py-15 lg:py-10'>
      <article className='mb-10 md:mb-12 lg:mb-10'>
        <div className='relative mx-auto flex flex-row gap-5 md:gap-15 md:px-7 lg:max-w-170 lg:gap-16'>
          <ProfileImage imageUrl={profile.image} />
          <div className='flex flex-1 flex-col justify-center gap-2 md:gap-4'>
            <p id='nickname' className='text-lg font-bold text-gray-900 md:text-2xl'>
              {profile.nickname}
            </p>
            <p
              id='description'
              className={clsx('text-body1 hidden text-gray-900 md:inline-block', 'grow')}
            >
              {profile.description}
            </p>
            <ProfileFollow profile={profile} />
          </div>
          <ProfileEditButton
            className={clsx(
              'absolute',
              'px-3 py-2 md:px-5 md:py-3',
              'top-0 right-0 bottom-auto',
              'md:top-auto md:right-7 md:bottom-0',
            )}
          />
        </div>
        <p className={clsx('text-body1 inline-block w-full text-gray-900 md:hidden', 'mx-2 mt-6')}>
          {profile.description}
        </p>
      </article>
      <ProfileStats profile={profile} />
      {isMyProfile && (
        <Button intent='tertiary' size='S' className={BUTTON_STYLES}>
          로그아웃
        </Button>
      )}
      {!isMyProfile && (
        <Button
          size='S'
          intent={isFollowing ? 'secondary' : 'primary'}
          className={BUTTON_STYLES}
          onClick={handleFollowToggle}
        >
          {isFollowing ? '팔로우 취소' : '팔로우'}
        </Button>
      )}
    </section>
  );
};

export default ProfileSection;
