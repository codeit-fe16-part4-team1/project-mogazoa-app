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

const CONTAINER_STYLES = 'flex cursor-pointer flex-col gap-3 md:gap-5';

const IMAGE_WRAPPER_STYLES =
  'relative aspect-square w-full overflow-hidden rounded-xl border-1 border-gray-300 md:aspect-[300/276]';

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
  'h-body2-skeleton md:h-sub-headline-skeleton skeleton-animate rounded-md w-3/5';

const STATS_SKELETON_STYLES =
  'h-caption-skeleton md:h-body1-skeleton skeleton-animate w-10 rounded-md';

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
    <div className={CONTAINER_STYLES} onClick={handleClick}>
      <div className={IMAGE_WRAPPER_STYLES}>
        <Image
          src={safeImageUrl}
          sizes='(max-width: 768px) 50vw, 33vw'
          fill
          alt={name}
          className='hover-grow rounded-xl opacity-0'
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
      <div className={CONTENTS_STYLES}>
        <div className={NAME_STYLES}>{name}</div>
        <div className={STATS_CONTAINER_STYLES}>
          <div className={STATS_STYLES}>
            <span>리뷰</span>
            <span>{reviewCount}</span>
          </div>
          <div className={STATS_STYLES}>
            <span>찜</span>
            <span>{likeCount}</span>
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
