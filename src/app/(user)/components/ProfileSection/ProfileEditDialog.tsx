'use client';

import { Button } from '@/components/Button/Button';
import { DialogContent } from '@/components/Dialog/core/DialogComponents';
import { getInitialImageList, ImageInputSchema } from '@/components/ImageInput/ImageInput';
import Input from '@/components/Input/Input';
import { TextArea } from '@/components/TextArea/TextArea';
import useDialog from '@/hooks/useDialog';
import { TextAreaSchema } from '@/lib/validations';
import { ProfileEditDialogProps } from '@/types/dialogProps.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import ProfileImageInput from './components/ProfileImageInput';

const profileEditScheme = z.object({
  image: ImageInputSchema(1, false),
  nickname: z
    .string()
    .min(1, '닉네임은 필수 입력입니다.')
    .max(10, '닉네임은 최대 10자까지 입력 가능합니다.'),
  description: TextAreaSchema({ minLength: 0, maxLength: 300, required: false }),
});

type ProfileEditFormInputs = z.infer<typeof profileEditScheme>;

const ProfileEditDialog = ({
  imageUrl,
  nickname,
  description,
  onSubmitSuccess,
}: ProfileEditDialogProps) => {
  const { close } = useDialog();
  const {
    control,
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProfileEditFormInputs>({
    resolver: zodResolver(profileEditScheme),
    mode: 'onChange',
    defaultValues: {
      image: getInitialImageList([imageUrl]),
      nickname,
      description: description || '',
    },
  });

  const onSubmit = async (data: ProfileEditFormInputs) => {
    await onSubmitSuccess({
      description: data.description || '',
      nickname: data.nickname,
      image: getValues('image'),
    });
    close();
  };

  const LABEL_STYLES = 'text-caption-bold md:text-body2-bold mb-3';

  return (
    <DialogContent showCloseButton={true}>
      <DialogTitle className='text-sub-headline-bold'>프로필 편집</DialogTitle>
      <DialogDescription className='sr-only'>
        프로필 정보를 수정하는 대화상자입니다.
      </DialogDescription>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx('flex justify-center', 'pt-7 pb-7 md:pt-11 md:pb-8')}>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <ProfileImageInput value={field.value} onChange={field.onChange} maxImageCount={1} />
            )}
          />
        </div>
        <label htmlFor='edit-nickname' className={LABEL_STYLES}>
          닉네임
        </label>
        <Input
          id='edit-nickname'
          size={'S'}
          className='md:text-body1 md:p-5'
          placeholder='닉네임을 입력해주세요'
          register={register('nickname')}
          error={errors.nickname}
          watchValue={watch('nickname')}
        />
        <p className='text-caption text-state-error mt-2 mb-6 md:mb-5 md:text-sm'>
          {errors.nickname?.message}
        </p>
        <label htmlFor='edit-description' className={LABEL_STYLES}>
          자기소개
        </label>
        <TextArea
          id='edit-description'
          className='min-h-32 md:min-h-42'
          maxLength={300}
          placeholder='자기소개를 입력해주세요'
          register={register('description')}
          error={errors.description}
          watchValue={watch('description')}
        />
        <Button
          type='submit'
          className='mt-7 h-12 w-full md:mt-13 md:h-15 md:w-full lg:w-full'
          disabled={!isValid || isSubmitting}
        >
          {!isSubmitting ? '저장하기' : '저장 중...'}
        </Button>
      </form>
    </DialogContent>
  );
};

export default ProfileEditDialog;
