import { userFollowAPI } from '@/api/follow/userFollowAPI';
import { userUnfollowAPI } from '@/api/follow/userUnfollowAPI';
import { Button } from '@/components/Button/Button';
import { profileKeys } from '@/constant/queryKeys';
import { getMyProfileId } from '@/lib/getMyProfileId';
import useAuthStore from '@/store/useAuthStore';
import { Profile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  profile: Profile;
  isMyProfile: boolean;
}

const ProfileButtonArea = ({ profile, isMyProfile }: Props) => {
  const queryClient = useQueryClient();

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
      const myProfileId = Number(await getMyProfileId());
      if (!myProfileId) return;
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(myProfileId) });
    },
  });

  const handleFollowToggle = () => {
    mutate(profile.isFollowing);
  };

  const handleSignoutClick = async () => {
    await signout();
    router.push('/signin');
  };

  const BUTTON_STYLES = 'mx-auto block w-full md:h-15 lg:w-160';

  return (
    <article>
      {isMyProfile && (
        <Button intent='tertiary' size='S' className={BUTTON_STYLES} onClick={handleSignoutClick}>
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
