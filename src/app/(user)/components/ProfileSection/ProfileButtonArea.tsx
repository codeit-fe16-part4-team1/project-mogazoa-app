import { userFollowAPI } from '@/api/follow/userFollowAPI';
import { userUnfollowAPI } from '@/api/follow/userUnfollowAPI';
import { Button } from '@/components/Button/Button';
import { Profile } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  profile: Profile;
  isMyProfile: boolean;
}

const ProfileButtonArea = ({ profile, isMyProfile }: Props) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);

  const { mutate } = useMutation({
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        await userUnfollowAPI({ userId: profile.id });
      } else {
        await userFollowAPI({ userId: profile.id });
      }
    },
    onMutate: (originalValue) => {
      setIsFollowing(!originalValue);
      return { originalValue };
    },
    onError: (_error, _variables, context) => {
      if (context?.originalValue !== undefined) {
        setIsFollowing(context.originalValue);
      }
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
    // },
  });

  const handleFollowToggle = () => {
    mutate(isFollowing);
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
          intent={isFollowing ? 'secondary' : 'primary'}
          className={BUTTON_STYLES}
          onClick={handleFollowToggle}
        >
          {isFollowing ? '팔로우 취소' : '팔로우'}
        </Button>
      )}
    </article>
  );
};

export default ProfileButtonArea;
