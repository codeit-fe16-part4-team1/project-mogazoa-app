'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  images: z
    .array(z.instanceof(File)) // FileList가 아닌 File 배열로 변경
    .min(1, '이미지를 1개 이상 선택해주세요')
    .max(5, '최대 5개까지 선택 가능합니다'),
});
type FormData = z.infer<typeof schema>;

type FileDataArray = [string, { file: File; url: string }][];

export default function FileUploadForm() {
  const [fileDataArray, setFileDataArray] = useState<FileDataArray>([]);

  const {
    register,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      images: undefined,
    },
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileDataArray = Array.from(e.target.files || []).map((f) => [
      f.name,
      { file: f, url: URL.createObjectURL(f) },
    ]);
    const nextFileRecord = {
      ...Object.fromEntries(fileDataArray),
      ...Object.fromEntries(newFileDataArray),
    };
    const nextFileDataArray = Object.entries(nextFileRecord) as FileDataArray;

    await updateHookFormState(nextFileDataArray);
  };

  const handleFileDeleteClick = async (indexToRemove: number) => {
    const newFileDataArray = fileDataArray.filter((_, index) => index !== indexToRemove);
    await updateHookFormState(newFileDataArray);
  };

  const updateHookFormState = async (nextFileDataArray: FileDataArray) => {
    setFileDataArray(nextFileDataArray);
    const nextFileList = nextFileDataArray.map((f) => f[1].file);
    setValue('images', nextFileList);
    await trigger('images');
  };

  return (
    <form>
      <div>
        <input
          type='file'
          multiple
          accept='image/*'
          {...register('images')}
          onChange={onFileChange}
        />
      </div>

      <button type='submit' disabled={!isValid}>
        업로드 {isValid ? '✓' : '✗'}
      </button>
      {fileDataArray.map((f, index) => (
        <div key={index} className='relative'>
          <div
            className='h-24 w-24 rounded-lg bg-cover bg-center'
            style={{ backgroundImage: `url(${f[1].url})` }}
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
    </form>
  );
}
