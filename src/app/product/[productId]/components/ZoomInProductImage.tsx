import { cn } from '@/lib/cn';
import { HTMLAttributes } from 'react';

interface ZoomInProductImageProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  originalImageSize: { width: number; height: number };
  mouseOver: boolean;
  mousePosition: { x: number; y: number };
  zoomScale?: number;
}

const ZoomInProductImage = ({
  className,
  imageUrl,
  originalImageSize,
  mouseOver,
  mousePosition,
  zoomScale = 2,
  ...props
}: ZoomInProductImageProps) => {
  const ZOOM_CONTAINER_SIZE = 200;

  return (
    <figure
      className={cn(
        mouseOver ? 'relative' : 'hidden',
        `z-40 overflow-hidden rounded-full bg-white`,
        'shadow-[inset_0_0_10px_rgba(255,255,255,0.8),_0_0_20px_rgba(0,0,0,0.3)]',
        'drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]',
        className,
      )}
      style={{
        width: ZOOM_CONTAINER_SIZE,
        height: ZOOM_CONTAINER_SIZE,
        top: mousePosition.y - ZOOM_CONTAINER_SIZE / 2,
        left: mousePosition.x - ZOOM_CONTAINER_SIZE / 2,
        pointerEvents: 'none',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${originalImageSize.width * zoomScale}px ${originalImageSize.height * zoomScale}px`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${-mousePosition.x * zoomScale + ZOOM_CONTAINER_SIZE / 2}px ${-mousePosition.y * zoomScale + ZOOM_CONTAINER_SIZE / 2}px`,
      }}
      {...props}
    />
  );
};

export default ZoomInProductImage;
