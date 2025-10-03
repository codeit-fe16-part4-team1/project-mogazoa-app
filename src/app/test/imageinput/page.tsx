'use client';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import ImageInput, {
  getInitialImageList,
  getUploadedImageUrlArray,
  ImageInputSchema,
} from '@/components/ImageInput/ImageInput';

const schema = z.object({
  images: ImageInputSchema(3),
});
type FormData = z.infer<typeof schema>;

export default function FileUploadForm() {
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      images: getInitialImageList([
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756312692708/image.png',
      ]),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const list = await getUploadedImageUrlArray(getValues('images'));
    console.log(list);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Controller
        name='images'
        control={control}
        render={({ field }) => (
          <ImageInput value={field.value} onChange={field.onChange} maxImageCount={3} />
        )}
      ></Controller>
      <button type='submit' disabled={!isValid}>
        업로드 {isValid ? '✓' : '✗'}
      </button>
    </form>
  );
}
