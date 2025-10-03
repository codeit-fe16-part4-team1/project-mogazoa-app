'use client';
import Image from 'next/image';

import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';

interface Props {
  imageUrl: string;
}

const ProfileImageViewer = ({ imageUrl }: Props) => {
  const defaultUrl = '/images/image_default_profile.png';
  const { safeImageUrl, onError } = useSafeImageUrl(imageUrl, defaultUrl);
  return (
    <div className='relative size-17 rounded-full shadow-xl md:size-40'>
      <Image
        src={safeImageUrl}
        className='rounded-full object-cover'
        alt='프로필 이미지'
        priority={true}
        fill
        sizes='(max-width: 768px) 68px, 160px'
        onError={onError}
        unoptimized={safeImageUrl.startsWith('blob:')}
      />
    </div>
  );
};

export default ProfileImageViewer;
