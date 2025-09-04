'use client';

import { Button } from '@/components/Button/Button';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from '@/components/Dialog/core/DialogComponents';
import { ReviewFormDialogProps } from '@/types/dialogProps.types';
import Image from 'next/image';
import Rating from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import z from 'zod';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageInput, { getInitialImageList, ImageInputSchema } from '../ImageInput/ImageInput';
import { TextAreaSchema } from '@/lib/validations';
import ScrollContainer from 'react-indiana-drag-scroll';

const INITIAL_RATING = 3;
const MAX_IMAGE_COUNT = 3;

const reviewFormSchema = z.object({
  rating: z.number(),
  reviewContent: TextAreaSchema({ maxLength: 300 }),
  reviewImages: ImageInputSchema(3),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

const ReviewFormDialog = ({
  mode,
  productId,
  reviewId,
  categoryName,
  productName,
  productImageUrl,
  rating,
  reviewContent = '',
  reviewImages = [],
}: ReviewFormDialogProps) => {
  if (mode === 'edit' && !reviewId) throw new Error('ReviewFormDialog Props Error');

  const {
    control,
    formState: { errors, isSubmitted },
    handleSubmit,
    register,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    mode: 'onBlur',
    defaultValues: {
      rating: rating || INITIAL_RATING,
      reviewContent: reviewContent || '',
      reviewImages: getInitialImageList(reviewImages.map((reviewImage) => reviewImage.source)),
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    const submitData = {
      productId,
      images: Object.values(data.reviewImages),
      content: data.reviewContent,
      rating: data.rating,
    };
    console.log(submitData);
  };

  const onInvalid = (errors: FieldErrors<ReviewFormData>) => {
    console.log('폼 제출 실패. 에러 객체:', errors);
  };

  return (
    <DialogContent className='w-84 gap-7 overflow-x-hidden border-none px-5 py-10 md:w-135 md:gap-10 md:px-10 md:py-12'>
      {/* Header */}
      <DialogHeader>
        <DialogTitle>리뷰 {mode === 'create' ? '작성' : '편집'}하기</DialogTitle>
      </DialogHeader>

      {/* Body */}
      <form
        className='flex w-full max-w-74 flex-col gap-6 md:max-w-115 md:gap-8'
        method={mode === 'create' ? 'POST' : 'PATCH'}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <section className='flex items-start gap-2 border-b border-b-gray-200 pb-4 md:gap-5 md:pb-7'>
          <figure className='relative aspect-square size-16 md:size-20'>
            <Image
              className='rounded-lg object-cover'
              src={productImageUrl}
              alt='상품 이미지'
              fill
              priority
            />
          </figure>
          <div className='flex grow-1 flex-col gap-1'>
            <h2 className='text-caption md:text-body2 text-gray-600'>{categoryName}</h2>
            <h1 className='text-caption-medium md:text-sub-headline-medium text-gray-900'>
              {productName}
            </h1>
          </div>
        </section>
        <section className='flex flex-col gap-5'>
          <div className='flex-between-center'>
            <h2 className='text-caption-bold md:text-body2-bold text-gray-900'>별점</h2>
            <Controller
              name='rating'
              control={control}
              render={({ field }) => (
                <Rating rating={field.value} onRatingChange={field.onChange} {...field} />
              )}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-caption-bold md:text-body2-bold text-gray-900'>상품 후기</h2>
            <TextArea
              className='min-h-32 border-gray-300 break-words'
              register={register('reviewContent')}
              watchValue={watch('reviewContent')}
              defaultValue={reviewContent}
              placeholder='후기를 작성해주세요'
              error={errors.reviewContent}
              isSubmitted={isSubmitted}
              maxLength={300}
            />
            <p className='text-caption md:text-body2 text-state-error'>
              {errors.reviewContent?.message}
            </p>
          </div>
        </section>
        <section className='w-full'>
          <Controller
            name='reviewImages'
            control={control}
            render={({ field }) => (
              <ScrollContainer
                className='w-full cursor-grab pt-1.5 active:cursor-grabbing [&::-webkit-scrollbar]:hidden'
                horizontal
              >
                <ImageInput maxImageCount={MAX_IMAGE_COUNT} {...field} />
              </ScrollContainer>
            )}
          />
        </section>

        {/* Footer */}
        <DialogFooter className='flex-between-center w-full'>
          <Button className='w-full' type='submit' size='S'>
            리뷰 작성 완료
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ReviewFormDialog;
