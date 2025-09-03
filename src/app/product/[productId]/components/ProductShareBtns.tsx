import HeartLikes from '@/components/Likes/HeartLikes';
import { HTMLAttributes } from 'react';
import KakaoShareBtn from '@/assets/icons/icon_kakao_share.svg';
import ShareBtn from '@/assets/icons/icon_share.svg';
import { cn } from '@/lib/cn';

interface ProductShareBtnsProps extends HTMLAttributes<HTMLDivElement> {
  productId: number;
  isHeartFavorite: boolean;
}

const ProductShareBtns = ({
  className,
  productId,
  isHeartFavorite,
  ...props
}: ProductShareBtnsProps) => {
  return (
    <div className={cn('inline-flex-between-center mb-8 gap-3 md:mb-12', className)} {...props}>
      <HeartLikes productId={productId} favorite={isHeartFavorite} />
      <KakaoShareBtn className='hover-grow cursor-pointer' />
      <ShareBtn className='hover-grow cursor-pointer' />
    </div>
  );
};

export default ProductShareBtns;
