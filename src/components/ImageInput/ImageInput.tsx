'use client';
import { useEffect, useState } from 'react';
import z from 'zod';

export const ImageInputSchema = z
  .array(z.instanceof(File))
  .min(1, '이미지를 1개 이상 선택해주세요')
  .max(5, '최대 5개까지 선택 가능합니다');

type FileDataArray = { isUploaded: boolean; file: File; url: string }[];

// ImageInput 컴포넌트 분리
interface ImageInputProps {
  value?: File[];
  onChange: (files: File[]) => void;
}

const ImageInput = ({ value = [], onChange }: ImageInputProps) => {
  const [fileDataArray, setFileDataArray] = useState<FileDataArray>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = value || [];
    const newFiles = Array.from(e.target.files || []);
    newFiles.forEach((newFile) => {
      if (
        !nextFiles.some(
          (existing) => existing.name === newFile.name && existing.size === newFile.size,
        )
      ) {
        nextFiles.push(newFile);
      }
    });

    onChange(nextFiles); // setValue + trigger
    e.target.value = ''; // input 초기화
  };

  const handleFileDeleteClick = (indexToRemove: number) => {
    const newFiles = value.filter((_, index) => index !== indexToRemove);
    onChange(newFiles);
  };

  // value가 변경될 때 fileDataArray 동기화
  useEffect(() => {
    const newFileDataArray = value.map((file) => ({
      isUploaded: false,
      file,
      url: URL.createObjectURL(file),
    })) as FileDataArray;
    setFileDataArray(newFileDataArray);
  }, [value]);

  return (
    <div>
      <input type='file' multiple accept='image/*' onChange={onFileChange} />

      {fileDataArray.map((f, index) => (
        <div key={`${f.url}-${index}`} className='relative'>
          <div
            className='h-24 w-24 rounded-lg bg-cover bg-center'
            style={{ backgroundImage: `url(${f.url})` }}
          />
          <button
            type='button'
            onClick={() => handleFileDeleteClick(index)}
            className='absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white'
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageInput;
