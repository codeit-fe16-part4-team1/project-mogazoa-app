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
import { FormEvent, useState } from 'react';

const ReviewFormDialog = ({
  mode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productId,
  reviewId,
  categoryName,
  productName,
  productImageUrl,
  rating,
  content = '',
  reviewImages = [],
}: ReviewFormDialogProps) => {
  if (mode === 'edit' && !reviewId) throw new Error('ReviewFormDialog Props Error');

  const [currentRating, setCurrentRating] = useState(rating || 3);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <DialogContent className='gap-7 px-5 py-10 md:gap-10 md:px-10 md:py-12'>
      {/* Header */}
      <DialogHeader>
        <DialogTitle>리뷰 {mode === 'create' ? '작성' : '편집'}하기</DialogTitle>
      </DialogHeader>

      {/* Body */}
      <form
        className='flex flex-col gap-6 md:gap-8'
        method={mode === 'create' ? 'POST' : 'PATCH'}
        onSubmit={(e) => handleSubmit(e)}
      >
        <section className='flex-between-center gap-2 border-b border-b-gray-200 pb-4 md:gap-5 md:pb-7'>
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
            <Rating rating={currentRating} onRatingChange={setCurrentRating} />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-caption-bold md:text-body2-bold text-gray-900'>상품 후기</h2>
            <TextArea className='border-gray-300' defaultValue={content} maxLength={300} />
          </div>
        </section>
        <section className='flex items-center justify-start gap-3'>
          {reviewImages.map((image, index) => (
            <figure key={image.id} className='relative size-30 md:size-35'>
              <Image
                className='rounded-xl'
                src={image.source}
                alt={`리뷰 이미지 ${index}`}
                fill
                priority
              />
            </figure>
          ))}
        </section>

        {/* Footer */}
        <DialogFooter className='flex-between-center w-full'>
          <Button className='w-full' type='submit' size='S' onClick={() => {}}>
            리뷰 작성 완료
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ReviewFormDialog;
