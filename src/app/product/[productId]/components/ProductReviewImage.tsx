import Image from 'next/image';

import React, { HTMLAttributes } from 'react';

import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';
import { cn } from '@/lib/cn';

interface ProductReviewImageProps extends HTMLAttributes<HTMLDivElement> {
  alt: string;
  source: string;
}

const ProductReviewImage = ({ className, source, alt, ...props }: ProductReviewImageProps) => {
  const { safeImageUrl, onError } = useSafeImageUrl(source, '/images/image_default_product.png');

  return (
    <figure className={cn('relative aspect-square size-16 md:size-25', className)} {...props}>
      <Image
        className='hover-grow rounded-3xl object-cover opacity-0'
        src={safeImageUrl}
        alt={alt}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // 제대로 공부할 필요
        onLoad={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onError={onError}
      />
    </figure>
  );
};

export default ProductReviewImage;
