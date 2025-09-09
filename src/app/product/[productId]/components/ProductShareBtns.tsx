import HeartLikes from '@/components/Likes/HeartLikes';
import { HTMLAttributes } from 'react';
import KakaoShareBtn from '@/assets/icons/icon_kakao_share.svg';
import ShareBtn from '@/assets/icons/icon_share.svg';
import { cn } from '@/lib/cn';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

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
  const [_isCopyed, copy] = useCopyToClipboard();

  const shareKakaoTalk = () => {
    const title =
      document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const description =
      document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
    const imageUrl =
      document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };

  return (
    <div className={cn('inline-flex-between-center mb-8 gap-3 md:mb-12', className)} {...props}>
      <HeartLikes productId={productId} favorite={isHeartFavorite} />
      <KakaoShareBtn className='hover-grow cursor-pointer' onClick={shareKakaoTalk} />
      <ShareBtn className='hover-grow cursor-pointer' onClick={copy} />
    </div>
  );
};

export default ProductShareBtns;
