import { userFollowAPI } from '@/api/follow/userFollowAPI';
import { userUnfollowAPI } from '@/api/follow/userUnfollowAPI';
import { Button } from '@/components/Button/Button';
import { profileKeys } from '@/constant/queryKeys';
import { getUserInfo } from '@/lib/getUserInfo';
import useAuthStore from '@/store/useAuthStore';
import { Profile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  profile: Profile;
  isMyProfile: boolean;
}

const ProfileButtonArea = ({ profile, isMyProfile }: Props) => {
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const { signout } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: async (isFollowing: boolean) => {
      if (isFollowing) {
        await userUnfollowAPI({ userId: profile.id });
      } else {
        await userFollowAPI({ userId: profile.id });
      }
    },
    onMutate: async (originalValue) => {
      const previousProfile = queryClient.getQueryData(profileKeys.detail(profile.id));

      queryClient.setQueryData(profileKeys.detail(profile.id), (old) => {
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
        queryClient.setQueryData(profileKeys.detail(profile.id), context.previousProfile);
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(profile.id) });
      const { userId } = await getUserInfo();
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) });
    },
  });

  const handleFollowToggle = () => {
    mutate(profile.isFollowing);
  };

  const handleSignoutClick = async () => {
    await signout();
    router.push('/signin');
  };

  const BUTTON_STYLES = 'mx-auto block w-full md:h-15 lg:w-160 h-12';

  useEffect(() => {
    const getMyUserId = async () => {
      const { isAuthenticated: isLogin } = await getUserInfo();
      setIsAuthenticated(isLogin);
    };
    getMyUserId();
  });

  return (
    <article>
      {isMyProfile && (
        <Button intent='tertiary' className={BUTTON_STYLES} onClick={handleSignoutClick}>
          로그아웃
        </Button>
      )}
      {!isMyProfile && (
        <Button
          intent={profile.isFollowing ? 'secondary' : 'primary'}
          className={BUTTON_STYLES}
          onClick={handleFollowToggle}
          disabled={!isAuthenticated}
        >
          {profile.isFollowing ? '팔로우 취소' : '팔로우'}
        </Button>
      )}
    </article>
  );
};

export default ProfileButtonArea;
