'use client';
import { useDelayedRender } from '@/hooks/useDelayRender';
import { useSafeImageUrl } from '@/hooks/useSafeImageUrl';
import { ProductItem } from '@/types/api';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CONTAINER_STYLES = 'flex cursor-pointer flex-col gap-3 md:gap-5';

const IMAGE_WRAPPER_STYLES =
  'relative aspect-square w-full overflow-hidden rounded-xl border-1 border-gray-300 md:aspect-[300/276] bg-white';

const CONTENTS_STYLES = 'flex flex-col gap-2 md:gap-3 md:px-2';

const NAME_STYLES = clsx(
  'text-gray-900 text-body2-medium md:text-sub-headline-medium w-full',
  'tracking-[-0.4px]',
);

const STATS_CONTAINER_STYLES = 'flex gap-2';

const STATS_STYLES = clsx(
  'text-caption md:text-body1 text-gray-700',
  'flex gap-1',
  'tracking-[-0.4px]',
);

//skeleton styles
const NAME_SKELETON_STYLES =
  'h-body2-skeleton md:h-sub-headline-skeleton rounded-md w-3/5 border-1 border-gray-300 bg-white';

const STATS_SKELETON_STYLES =
  'h-caption-skeleton md:h-body1-skeleton w-10 rounded-md border-1 border-gray-300 bg-white';

interface ProductCardProps {
  productItem: ProductItem;
}

const ProductCard = ({ productItem }: ProductCardProps) => {
  const { id, image, name, reviewCount, favoriteCount, rating } = productItem;
  const { safeImageUrl, onError } = useSafeImageUrl(image, '/images/image_default_product.png');
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };
  return (
    <div className={CONTAINER_STYLES} onClick={handleClick}>
      <div className={IMAGE_WRAPPER_STYLES}>
        <Image
          src={safeImageUrl}
          sizes='(max-width: 1024px) 50vw, 300px'
          fill
          alt={name}
          className='hover-grow rounded-xl opacity-0'
          style={{
            objectFit: 'cover',
          }}
          priority={true}
          onLoad={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onError={onError}
        />
      </div>
      <div className={CONTENTS_STYLES}>
        <div className={NAME_STYLES}>{name}</div>
        <div className={STATS_CONTAINER_STYLES}>
          <div className={STATS_STYLES}>
            <span>리뷰</span>
            <span>{reviewCount}</span>
          </div>
          <div className={STATS_STYLES}>
            <span>찜</span>
            <span>{favoriteCount}</span>
          </div>
          <div className={clsx(STATS_STYLES, 'ml-auto')}>
            <span>⭐</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  const shouldShowSkeleton = useDelayedRender({
    delay: 300,
  });

  if (!shouldShowSkeleton) return;

  return (
    <div className={CONTAINER_STYLES}>
      <div className={IMAGE_WRAPPER_STYLES} />
      <div className={CONTENTS_STYLES}>
        <div className={NAME_SKELETON_STYLES} />
        <div className={STATS_CONTAINER_STYLES}>
          <div className={STATS_SKELETON_STYLES} />
          <div className={STATS_SKELETON_STYLES} />
          <div className={clsx(STATS_SKELETON_STYLES, 'ml-auto')} />
        </div>
      </div>
    </div>
  );
};

ProductCard.skeleton = Skeleton;

export default ProductCard;
