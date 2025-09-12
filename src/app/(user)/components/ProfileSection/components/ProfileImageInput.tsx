import Image from 'next/image';
import { useRef } from 'react';
import IconAdd from '@/assets/icons/icon_imageinput_add.svg';
import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';
import { defaultProfileImageUrl } from '@/lib/imageUrl';
import IconDelete from '@/assets/icons/icon_imageinput_delete.svg';

type ImageList = Record<string, File | null>;

interface ImageInputProps {
  value?: ImageList;
  onChange: (imageList: ImageList) => void;
  maxImageCount: number;
}

const ProfileImageInput = ({ value: imageList = {}, onChange }: ImageInputProps) => {
  const defaultUrl = defaultProfileImageUrl;
  const imageUrl = Object.keys(imageList)[0];
  const { safeImageUrl, onError } = useSafeImageUrl(imageUrl, defaultUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialImageListRef = useRef(imageList);

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

  const handleDefaultImageSelect = () => {
    onChange({ [defaultProfileImageUrl]: null });
  };

  const handleResetImageSelect = () => {
    onChange(initialImageListRef.current);
  };

  const resetButtonVisible =
    Object.keys(initialImageListRef.current)[0] !== Object.keys(imageList)[0];

  console.log(`initialImage: ${Object.keys(initialImageListRef.current)[0]}`);
  console.log(`currentImage: ${Object.keys(imageList)[0]}`);

  // useEffect(() => {
  //   const imageUrl = Object.keys(imageList)[0];
  //   if (imageUrl === defaultProfileImageUrl) {
  //     onChange({});
  //   }
  // }, [imageList, onChange]);

  return (
    <div className='relative flex flex-col'>
      <button
        className='relative aspect-square w-25 cursor-pointer overflow-hidden rounded-full md:w-35'
        onClick={handleImageClick}
      >
        <Image
          src={safeImageUrl}
          alt='프로필 이미지'
          className='object-cover'
          fill
          onError={onError}
        />
        <div className='absolute inset-0 bg-black opacity-40' />
        <IconAdd className='absolute top-1/2 left-1/2 aspect-square w-8 translate-x-[-50%] translate-y-[-50%] text-white' />
      </button>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        multiple
        accept='image/*'
        onChange={onInputChange}
      />

      <button
        type='button'
        className='hover-animate mx-auto mt-2 w-fit cursor-pointer rounded-lg border-1 border-gray-400 bg-white px-2 py-1 text-gray-800 hover:bg-gray-200'
        onClick={handleDefaultImageSelect}
      >
        기본 이미지
      </button>

      {resetButtonVisible && (
        <button
          type='button'
          onClick={handleResetImageSelect}
          className='hover-animate absolute top-1 right-1 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gray-400 hover:bg-gray-500'
        >
          <IconDelete className='aspect-square w-5' />
        </button>
      )}
    </div>
  );
};

export default ProfileImageInput;
