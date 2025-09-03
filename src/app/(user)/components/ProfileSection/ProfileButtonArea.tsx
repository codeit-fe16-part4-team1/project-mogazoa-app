import { userFollowAPI } from '@/api/follow/userFollowAPI';
import { userUnfollowAPI } from '@/api/follow/userUnfollowAPI';
import { Button } from '@/components/Button/Button';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { Profile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';

interface Props {
  profile: Profile;
  isMyProfile: boolean;
}

const ProfileButtonArea = ({ profile, isMyProfile }: Props) => {
  // const [isFollowing, setIsFollowing] = useState(profile.isFollowing);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        await userUnfollowAPI({ userId: profile.id });
      } else {
        await userFollowAPI({ userId: profile.id });
      }
    },
    onMutate: async (originalValue) => {
      const previousProfile = queryClient.getQueryData(['profile', profile.id]);
      // setIsFollowing(!originalValue);
      queryClient.setQueryData(['profile', profile.id], (old) => {
        if (!old) {
          return {
            ...profile,
            isFollowing: !originalValue,
            followersCount: originalValue ? profile.followersCount - 1 : profile.followersCount + 1,
          };
        }
        return {
          ...old,
          isFollowing: !originalValue,
          followersCount: originalValue ? profile.followersCount - 1 : profile.followersCount + 1,
        };
      });
      return { previousProfile };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousProfile !== undefined) {
        // setIsFollowing(context.originalValue);
        queryClient.setQueryData(['profile', profile.id], context.previousProfile);
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
      const myProfileId = await getMyProfileId();
      if (!myProfileId) return;
      queryClient.invalidateQueries({ queryKey: ['profile', myProfileId] });
    },
  });

  const handleFollowToggle = () => {
    mutate(profile.isFollowing);
  };

  const BUTTON_STYLES = 'mx-auto block w-full md:h-15 lg:w-160';

  return (
    <article>
      {isMyProfile && (
        <Button intent='tertiary' size='S' className={BUTTON_STYLES}>
          로그아웃
        </Button>
      )}
      {!isMyProfile && (
        <Button
          size='S'
          intent={profile.isFollowing ? 'secondary' : 'primary'}
          className={BUTTON_STYLES}
          onClick={handleFollowToggle}
        >
          {profile.isFollowing ? '팔로우 취소' : '팔로우'}
        </Button>
      )}
    </article>
  );
};

export default ProfileButtonArea;
