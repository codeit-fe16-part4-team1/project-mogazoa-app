import Image from 'next/image';
import { useRef } from 'react';
import IconAddImage from '@/assets/icons/icon_imageinput_add.svg';

type ImageList = Record<string, File | null>;

interface ImageInputProps {
  value?: ImageList;
  onChange: (imageList: ImageList) => void;
  maxImageCount: number;
}

const ProfileImageInput = ({ value: imageList = {}, onChange }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageBlobURL = URL.createObjectURL(file);

    const newImageObject = {
      [imageBlobURL]: file,
    };
    onChange(newImageObject);
    e.target.value = '';
  };

  return (
    <div>
      <button
        className='relative aspect-square w-25 cursor-pointer overflow-hidden rounded-full md:w-35'
        onClick={handleImageClick}
      >
        <Image src={Object.keys(imageList)[0]} alt='프로필 이미지' className='object-cover' fill />
        <div className='absolute inset-0 bg-black opacity-40' />
        <IconAddImage className='absolute top-1/2 left-1/2 aspect-square w-8 translate-x-[-50%] translate-y-[-50%] text-white' />
      </button>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        multiple
        accept='image/*'
        onChange={onInputChange}
      />
    </div>
  );
};

export default ProfileImageInput;
