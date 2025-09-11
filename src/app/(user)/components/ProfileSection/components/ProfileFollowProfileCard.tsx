import { FollowUser } from '@/api/user/getUserFollowsAPI';
import useDialog from '@/hooks/useDialog';
import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';
import Image from 'next/image';

interface Props {
  followUser: FollowUser;
  withDivider?: boolean;
}

const ProfileFollowProfileCard = ({ followUser, withDivider = true }: Props) => {
  const defaultUrl = '/images/image_default_profile.png';
  const { safeImageUrl, onError } = useSafeImageUrl(followUser.image, defaultUrl);

  const { closeAllAndRoute } = useDialog();

  const handleProfileCardClick = () => {
    closeAllAndRoute(`/user/${followUser.id}`);
  };

  return (
    <div className='cursor-pointer' onClick={handleProfileCardClick}>
      <div className='mb-3 flex flex-row items-center gap-3'>
        <div className='relative aspect-square w-12 md:w-13'>
          <Image
            src={safeImageUrl}
            className='rounded-full object-cover'
            sizes='40px'
            alt='프로필 이미지'
            fill
            onError={onError}
          />
        </div>
        <p className='text-body2 md:text-body1 text-gray-900'>{followUser.nickname}</p>
      </div>
      {withDivider && <div className='border-b-1 border-gray-200' />}
    </div>
  );
};

export default ProfileFollowProfileCard;
