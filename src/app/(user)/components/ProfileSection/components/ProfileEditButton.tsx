import { updateMyProfileAPI, UpdateMyProfilePayload } from '@/api/user/updateMyProfileAPI';
import useDialog from '@/hooks/useDialog';
import { Profile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  profile: Profile;
}

const ProfileEditButton = ({ className, profile }: Props) => {
  const queryClient = useQueryClient();
  const { open } = useDialog();

  const handleProfileEditClick = () => {
    if (!profile) return;
    open({
      dialogName: 'profile-edit-dialog',
      dialogProps: {
        imageUrl: profile.image,
        nickname: profile.nickname,
        description: profile.description,
        onSubmitSuccess,
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: async ({ image, nickname, description }: UpdateMyProfilePayload) => {
      await updateMyProfileAPI({ image, nickname, description });
    },
    onMutate: async (newProfileData) => {
      // 현재 프로필 데이터 백업
      const previousProfile = queryClient.getQueryData(['profile', profile.id]);

      // 낙관적 업데이트 - 쿼리 캐시 직접 수정
      queryClient.setQueryData(['profile', profile.id], (old) => {
        if (!old) {
          return { ...profile, ...newProfileData };
        }
        return { ...old, ...newProfileData };
      });

      return { previousProfile };
    },
    onError: (_error, _variables, context) => {
      // 에러 시 이전 데이터로 롤백
      if (context?.previousProfile) {
        queryClient.setQueryData(['profile', profile.id], context.previousProfile);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['profile', profile.id] }),
  });

  const onSubmitSuccess = (updatedData: UpdateMyProfilePayload) => {
    mutate(updatedData);
  };

  return (
    <button
      className={clsx(
        'bg-gray-150 rounded-x1 text-gray-700 hover:bg-gray-300',
        'text-caption-medium md:text-body1-medium',
        className,
      )}
      onClick={handleProfileEditClick}
    >
      프로필 편집
    </button>
  );
};

export default ProfileEditButton;
