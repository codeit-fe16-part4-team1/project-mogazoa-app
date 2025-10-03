'use client';

import Image from 'next/image';

import { Controller, FieldErrors, useForm } from 'react-hook-form';
import ScrollContainer from 'react-indiana-drag-scroll';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import z from 'zod';

import { createReview } from '@/api/review/createReview';
import { Button } from '@/components/Button/Button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog/core/DialogComponents';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import useDialog from '@/hooks/useDialog';
import { TextAreaSchema } from '@/lib/validations';
import { ReviewFormDialogProps } from '@/types/dialogProps.types';

import ImageInput, {
  getInitialImageList,
  getUploadedImageUrlArray,
  ImageInputSchema,
} from '../ImageInput/ImageInput';
import Rating from '../Rating/Rating';
import RequiredLabel from '../RequiredLabel/RequiredLabel';
import { TextArea } from '../TextArea/TextArea';
import { updateReview, UpdateReviewPayload } from './../../api/review/updateReview';

const INITIAL_RATING = 0;
const MAX_IMAGE_COUNT = 3;
const MAX_CONTENT_LENGTH = 300;

const reviewFormSchema = z.object({
  rating: z.number().min(1, '별점으로 상품을 평가해주세요.'),
  reviewContent: TextAreaSchema({ maxLength: MAX_CONTENT_LENGTH }),
  reviewImages: ImageInputSchema(MAX_IMAGE_COUNT, false),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

const ReviewFormDialog = ({
  mode,
  order,
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

  const { closeAll } = useDialog();
  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
    getValues,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    mode: 'onChange',
    defaultValues: {
      rating: rating || INITIAL_RATING,
      reviewContent: reviewContent || '',
      reviewImages: getInitialImageList(reviewImages.map((reviewImage) => reviewImage.source)),
    },
  });

  const { mutate: createMutate, isPending: createIsPending } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      closeAll();
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(productId, order) });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
    },
    onError: (error) => {
      alert('리뷰 등록에 실패했습니다: ' + error.message);
    },
  });

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (args: UpdateReviewPayload & { reviewId: number }) => {
      const { reviewId, ...payload } = args;
      return updateReview(reviewId, payload);
    },
    onSuccess: () => {
      closeAll();
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(productId, order) });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
    },
    onError: (error) => {
      alert('리뷰 수정에 실패했습니다: ' + error.message);
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    const imageUrls = await getUploadedImageUrlArray(getValues('reviewImages'));

    if (mode === 'create') {
      const submitData = {
        productId,
        images: imageUrls,
        content: data.reviewContent,
        rating: data.rating,
      };
      createMutate(submitData);
    } else if (reviewId) {
      const submitData = {
        reviewId,
        images: imageUrls.map((url) => ({ source: url })),
        content: data.reviewContent,
        rating: data.rating,
      };
      updateMutate(submitData);
    }
  };

  const onInvalid = (errors: FieldErrors<ReviewFormData>) => {
    console.log('폼 제출 실패. 에러 객체:', errors);
  };

  return (
    <DialogContent className='md:vor w-84 gap-7 overflow-x-hidden border-none px-5 py-10 md:w-135 md:gap-10 md:border-none md:px-10 md:py-12'>
      {/* Header */}
      <DialogHeader>
        <DialogTitle>리뷰 {mode === 'create' ? '작성' : '편집'}하기</DialogTitle>
      </DialogHeader>

      {/* Body */}
      <form
        className='flex w-full max-w-74 flex-col gap-6 md:max-w-108 md:gap-8'
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
            <RequiredLabel
              className='text-caption-bold md:text-body2-bold text-gray-900'
              htmlFor='rating'
            >
              별점
            </RequiredLabel>
            <Controller
              name='rating'
              control={control}
              render={({ field }) => (
                <Rating
                  id='rating'
                  rating={field.value}
                  onRatingChange={field.onChange}
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <RequiredLabel
              className='text-caption-bold md:text-body2-bold text-gray-900'
              htmlFor='reviewContent'
            >
              상품 후기
            </RequiredLabel>
            <TextArea
              id='reviewContent'
              className='min-h-32 border-gray-300 break-words md:min-h-42'
              register={register('reviewContent')}
              watchValue={watch('reviewContent')}
              defaultValue={reviewContent}
              placeholder='후기를 작성해주세요'
              error={errors.reviewContent}
              maxLength={300}
            />
            <p className='text-caption md:text-body2 text-state-error'>
              {errors.reviewContent?.message}
            </p>
          </div>
        </section>
        <section className='w-full'>
          <ScrollContainer
            className='w-full cursor-grab pt-1.5 active:cursor-grabbing [&::-webkit-scrollbar]:hidden'
            horizontal
          >
            <Controller
              name='reviewImages'
              control={control}
              render={({ field }) => (
                <ImageInput
                  maxImageCount={MAX_IMAGE_COUNT}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </ScrollContainer>
        </section>

        {/* Footer */}
        <DialogFooter className='flex-between-center w-full'>
          <Button
            className='w-full'
            type='submit'
            size='S'
            disabled={!isValid || createIsPending || updateIsPending}
          >
            리뷰 작성 완료
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ReviewFormDialog;
