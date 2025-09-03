'use client';
import Image from 'next/image';

interface Props {
  imageUrl: string;
}

const ProfileImageViewer = ({ imageUrl }: Props) => {
  return (
    <div className='relative aspect-square w-17 rounded-full md:w-40'>
      {imageUrl && (
        <Image
          src={imageUrl}
          className='rounded-full object-cover'
          alt='프로필 이미지'
          fill
          unoptimized={imageUrl.startsWith('blob:')}
        />
      )}
    </div>
  );
};

export default ProfileImageViewer;
