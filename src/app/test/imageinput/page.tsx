'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ImageInput, { ImageInputSchema } from '@/components/ImageInput/ImageInput';

const schema = z.object({
  images: ImageInputSchema,
});
type FormData = z.infer<typeof schema>;

const FileUploadForm = () => {
  const {
    control,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      images: [],
    },
  });

  return (
    <form>
      <Controller
        name='images'
        control={control}
        render={({ field }) => <ImageInput value={field.value} onChange={field.onChange} />}
      />

      <button type='submit' disabled={!isValid}>
        업로드 {isValid ? '✓' : '✗'}
      </button>
    </form>
  );
};

export default FileUploadForm;
