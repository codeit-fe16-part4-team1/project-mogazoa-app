import { cn } from '@/lib/cn';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface ProductImageProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
}

const ProductImage = ({ className, imageUrl, ...props }: ProductImageProps) => {
  return (
    imageUrl && (
      <figure
        className={cn(
          'relative aspect-[375/320] w-full md:my-10 md:aspect-video lg:my-0 lg:aspect-[16/15]',
          className,
        )}
        {...props}
      >
        <Image
          className='absolute inset-0 opacity-80 blur-3xl md:opacity-50 md:blur-2xl lg:opacity-80 lg:blur-xl'
          src={imageUrl}
          alt='블러 이미지'
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <Image
          className='z-[10] object-cover md:object-contain lg:rounded-3xl lg:object-cover'
          src={imageUrl}
          alt='상품 이미지'
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // 제대로 공부할 필요
        />
      </figure>
    )
  );
};

export default ProductImage;
