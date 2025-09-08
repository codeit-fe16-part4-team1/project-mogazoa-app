'use client';
import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  id?: number;
  imgUrl: string;
  name: string;
  reviewCount: number;
  likeCount: number;
  rating: number;
  isLandingPage?: boolean;
  linkToDetailPage?: boolean;
}

const PRODUCT_NAME_STYLES = [
  'text-gray-900',
  'text-body2-medium',
  'tracking-[-0.4px]',
  'md:text-sub-headline-medium',
];
const PRODUCT_STATS_STYLES = [
  'text-caption',
  'text-gray-700',
  'tracking-[-0.4px]',
  'md:text-body1',
];

const ProductCard = ({
  id,
  imgUrl,
  name,
  reviewCount,
  likeCount,
  rating,
  isLandingPage = false,
  linkToDetailPage = true,
}: ProductCardProps) => {
  const { safeImageUrl, onError } = useSafeImageUrl(imgUrl, '/images/image_default_product.png');
  const router = useRouter();
  const handleClick = () => {
    if (linkToDetailPage && id) {
      router.push(`/product/${id}`);
    }
  };
  return (
    <div className='flex cursor-pointer flex-col gap-3 md:gap-5' onClick={handleClick}>
      <div className='relative aspect-square w-full overflow-hidden rounded-xl border-1 border-gray-300 md:aspect-[300/276]'>
        <Image
          src={safeImageUrl}
          sizes='(max-width: 768px) 50vw, 33vw'
          fill
          alt={name}
          className='hover-grow opacity-0'
          style={{
            objectFit: 'cover',
          }}
          priority={isLandingPage}
          onLoad={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onError={onError}
        />
      </div>
      <div className='flex flex-col gap-2 md:gap-3 md:px-2'>
        <div className={clsx('w-full', ...PRODUCT_NAME_STYLES)}>{name}</div>
        <div className={clsx('flex gap-2', ...PRODUCT_STATS_STYLES)}>
          <div className='flex gap-1'>
            <span>리뷰</span>
            <span>{reviewCount}</span>
          </div>
          <div className='flex gap-1'>
            <span>찜</span>
            <span>{likeCount}</span>
          </div>
          <div className='ml-auto flex gap-1'>
            <span>⭐</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
