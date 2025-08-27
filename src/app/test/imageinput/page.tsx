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

/*
  state Type
  filname: {
    file: File;
    url: string;
  }
*/
export default function FileUploadForm() {
  const [fileRecord, setFileRecord] = useState<Record<string, { file: File; url: string }>>({});

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileArray = Array.from(e.target.files || []).map((f) => [
      f.name,
      { file: f, url: URL.createObjectURL(f) },
    ]);
    const newFileRecord = Object.fromEntries(newFileArray);
    const nextFileRecord = { ...fileRecord, ...newFileRecord } as typeof fileRecord;

    await updateHookFormState(nextFileRecord);
  };

  const removeFile = async (indexToRemove: number) => {
    const nextFileArray = Object.entries(fileRecord).filter((_, index) => index !== indexToRemove);
    const nextFileRecord = Object.fromEntries(nextFileArray);

    await updateHookFormState(nextFileRecord);
  };

  const updateHookFormState = async (nextFileRecord: typeof fileRecord) => {
    setFileRecord(nextFileRecord);

    const nextFileList = Object.values(nextFileRecord).map((item) => item.file);

    setValue('images', nextFileList);
    await trigger('images');
  };

  const fileArray = Object.values(fileRecord).map((item) => item.url);

  return (
    <form>
      <div>
        <input
          type='file'
          multiple
          accept='image/*'
          {...register('images')}
          onChange={handleFileChange}
        />
      </div>

      <button type='submit' disabled={!isValid}>
        업로드 {isValid ? '✓' : '✗'}
      </button>
      {fileArray.map((url, index) => (
        <div key={index} className='relative'>
          <div
            className='h-24 w-24 rounded-lg bg-cover bg-center'
            style={{ backgroundImage: `url(${url})` }}
          />
          <button
            type='button'
            onClick={() => removeFile(index)}
            className='absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white'
          >
            ✕
          </button>
        </div>
      ))}
    </form>
  );
}
