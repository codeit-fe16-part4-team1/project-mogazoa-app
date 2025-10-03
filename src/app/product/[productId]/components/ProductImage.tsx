import Image from 'next/image';

import { HTMLAttributes, MouseEvent, SyntheticEvent, useState } from 'react';

import ZoomInIcon from '@/assets/icons/icon_zoom_in.svg';
import { cn } from '@/lib/cn';

import ZoomInProductImage from './ZoomInProductImage';

interface ProductImageProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
}

const ProductImage = ({ className, imageUrl, ...props }: ProductImageProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOriginalImageSize({ width: rect.width, height: rect.height });
  };

  return (
    imageUrl && (
      <figure
        className={cn(
          'relative aspect-[375/320] w-full md:my-10 md:aspect-video lg:my-0 lg:aspect-[16/15]',
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseOut={() => setIsMouseOver(false)}
        style={{ cursor: isMouseOver ? 'none' : 'default' }}
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
          onLoad={handleImageLoad}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // 제대로 공부할 필요
        />
        {!isMouseOver && (
          <ZoomInIcon className='absolute right-4 bottom-4 z-11 size-8 md:hidden lg:block lg:size-10' />
        )}
        {isMouseOver && (
          <ZoomInProductImage
            className='md:hidden lg:block'
            imageUrl={imageUrl}
            originalImageSize={originalImageSize}
            mouseOver={isMouseOver}
            mousePosition={mousePosition}
          />
        )}
      </figure>
    )
  );
};

export default ProductImage;
