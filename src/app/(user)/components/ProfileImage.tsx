import Image from 'next/image';

interface Props {
  imageUrl: string;
}

const ProfileImage = ({ imageUrl }: Props) => {
  return (
    <div className='relative aspect-square w-17 rounded-full md:w-40'>
      <Image src={imageUrl} className='rounded-full object-cover' alt='프로필 이미지' fill />
    </div>
  );
};

export default ProfileImage;
