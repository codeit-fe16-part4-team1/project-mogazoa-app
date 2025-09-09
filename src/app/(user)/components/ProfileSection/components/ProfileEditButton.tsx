import { updateMyProfileAPI } from '@/api/user/updateMyProfileAPI';
import { getUploadedImageUrlArray, ImageList } from '@/components/ImageInput/ImageInput';
import { profileKeys } from '@/constant/queryKeys';
import useDialog from '@/hooks/useDialog';
import { defaultProfileImageUrl } from '@/lib/imageUrl';
import { Profile } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export interface ProfileEditMutationData {
  image: ImageList;
  description: string;
  nickname: string;
}

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

  const { mutateAsync } = useMutation({
    mutationFn: async ({ image, nickname, description }: ProfileEditMutationData) => {
      const imageKey = Object.keys(image)[0];
      const imageFile = Object.values(image)[0];
      let uploadedImageUrl;
      if (!imageKey) {
        uploadedImageUrl = defaultProfileImageUrl;
      } else {
        uploadedImageUrl = imageKey;
      }
      if (imageFile instanceof File) {
        const imageList = await getUploadedImageUrlArray(image);
        uploadedImageUrl = imageList[0];
      }
      await updateMyProfileAPI({ image: uploadedImageUrl, nickname, description });
      return {
        ...profile,
        image: uploadedImageUrl,
        nickname,
        description,
      };
    },
    // onMutate: async (newProfileData) => {
    //   // 현재 프로필 데이터 백업
    //   const previousProfile = queryClient.getQueryData(profileKeys.detail(profile.id));

    //   // image가 있으면 첫 번째 key(URL) 사용, 없으면 기존 이미지
    //   const optimisticImageUrl =
    //     newProfileData.image && Object.keys(newProfileData.image).length > 0
    //       ? Object.keys(newProfileData.image)[0] // 새 이미지 또는 기존 이미지 URL
    //       : profile.image;

    //   // 낙관적 업데이트 - 쿼리 캐시 직접 수정
    //   queryClient.setQueryData(profileKeys.detail(profile.id), (old) => {
    //     if (!old) {
    //       return { ...profile, ...newProfileData, image: optimisticImageUrl };
    //     }
    //     return { ...old, ...newProfileData, image: optimisticImageUrl };
    //   });

    //   return { previousProfile };
    // },
    onSuccess: (actualData) => {
      queryClient.setQueryData(profileKeys.detail(profile.id), actualData);
    },
    onError: (error, _variables, _context) => {
      // 에러 시 이전 데이터로 롤백
      // if (context?.previousProfile) {
      //   queryClient.setQueryData(profileKeys.detail(profile.id), context.previousProfile);
      // }
      console.error('Profile update failed:', error);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: profileKeys.detail(profile.id) }),
  });

  const onSubmitSuccess = async (updatedData: ProfileEditMutationData) => {
    await mutateAsync(updatedData);
  };

  return (
    <button
      className={clsx(
        'bg-gray-150 rounded-x1 text-gray-700 hover:bg-gray-300',
        'text-caption-medium md:text-body1-medium',
        'hover-animate cursor-pointer',
        className,
      )}
      onClick={handleProfileEditClick}
    >
      프로필 편집
    </button>
  );
};

export default ProfileEditButton;
