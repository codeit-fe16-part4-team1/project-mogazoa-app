'use client';
import { useRef } from 'react';
import z from 'zod';
import IconAdd from '@/assets/icons/icon_imageinput_add.svg';
import IconDelete from '@/assets/icons/icon_imageinput_delete.svg';
import clsx from 'clsx';
import { getUploadedImageUrlAPI } from '@/api/image/getUploadedImageUrlAPI';

// ImageInput 전용 zod schema
export const ImageInputSchema = (maxImageCount: number) => {
  return z
    .record(
      z.string(),
      z.custom<File | null>((val) => val instanceof File || val === null),
    )
    .refine((data) => Object.keys(data).length >= 1, '이미지를 1개 이상 선택해주세요')
    .refine(
      (data) => Object.keys(data).length <= maxImageCount,
      `최대 ${maxImageCount}개까지 선택 가능합니다`,
    );
};

// 이미지 url 배열을 Record<string, File | null> Type으로 변환
export const getInitialValue = (images: string[]) => {
  const initialValue: Record<string, File | null> = {};
  images.forEach((url) => {
    initialValue[url] = null;
  });
  return initialValue;
};

// Image 업로드 후 경로 반환
// File이 null일 경우 key값(url)을 그대로 반환
export const getUploadedImageList = async (
  value: Record<string, File | null>,
): Promise<string[]> => {
  const urlList: string[] = [];
  Object.entries(value).forEach(async ([url, file]) => {
    if (!file) {
      urlList.push(url);
      return;
    }
    const res = await getUploadedImageUrlAPI({ file });
    urlList.push(res.url);
  });
  return urlList;
};

// ImageInput Type
interface ImageInputProps {
  value?: Record<string, File | null>;
  onChange: (files: Record<string, File | null>) => void;
  maxImageCount: number;
}

const ImageInput = ({ value = {}, onChange, maxImageCount }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (Object.keys(value).length >= 3) {
      alert(`이미지는 최대 ${maxImageCount}개까지 선택 가능합니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const totalFilesCount = Object.keys(value).length + newFiles.length;

    if (totalFilesCount > maxImageCount) {
      alert(
        `최대 선택 가능한 갯수를 초과했습니다.\n선택 가능한 이미지 갯수: ${maxImageCount}개 \n총 선택된 이미지 갯수: ${totalFilesCount}개`,
      );
    } else {
      const newUrls: Record<string, File> = {};
      newFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        // Record<string, File | null>
        newUrls[url] = file;
      });
      // 기존 파일과 합치기
      const allFiles = { ...value, ...newUrls };
      onChange(allFiles); // React Hook Form 업데이트
    }
    e.target.value = '';
  };

  const handleFileDeleteClick = (deleteIndex: number) => {
    const urls = Object.keys(value);
    const urlToDelete = urls[deleteIndex];

    // 해당 URL 제거한 새로운 Record 생성
    const nextFiles = { ...value };
    URL.revokeObjectURL(urlToDelete);
    delete nextFiles[urlToDelete];

    onChange(nextFiles); // Record<string, File | null>
  };

  const CONTAINER_STYLES = 'flex flex-row gap-5';
  const ADDBUTTON_STYLES =
    'flex cursor-pointer flex-col items-center justify-center gap-1 hover:bg-gray-200 text-body2-medium text-gray-800';
  const COMMON_ELEMENT_STYLES =
    'border-1 border-gray-300 aspect-square w-30 md:w-35 rounded-xl flex-shrink-0';

  return (
    <div className={CONTAINER_STYLES}>
      <button
        className={clsx(ADDBUTTON_STYLES, COMMON_ELEMENT_STYLES)}
        onClick={handleAddButtonClick}
      >
        <IconAdd />
        <span>이미지추가</span>
        <div>
          <span className={clsx(Object.keys(value).length > 0 && 'text-primary-orange-700')}>
            {Object.keys(value).length}
          </span>
          <span>{`/${maxImageCount}`}</span>
        </div>
      </button>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        multiple
        accept='image/*'
        onChange={onInputChange}
      />

      {Object.keys(value).map((url, index) => (
        <div
          key={`${url}-${index}`}
          className={clsx(
            'relative flex flex-col justify-end bg-cover bg-center',
            COMMON_ELEMENT_STYLES,
          )}
          style={{ backgroundImage: `url(${url})` }}
        >
          {index === 0 && (
            <div className='text-body2-medium flex h-[30%] w-[100%] items-center justify-center rounded-b-xl bg-gray-900 text-white'>
              대표이미지
            </div>
          )}
          <button
            type='button'
            onClick={() => handleFileDeleteClick(index)}
            className='absolute -top-2 -right-0 flex aspect-square w-8 translate-x-[50%] cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gray-400 hover:bg-gray-500'
          >
            <IconDelete className='aspect-square w-5' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageInput;
