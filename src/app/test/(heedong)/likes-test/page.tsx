'use client';

import { getProductDetail } from '@/api/product/getProductDetail';
import { getReviewList } from '@/api/product/getReviewList';
import HeartLikes from '@/components/Likes/HeartLikes';
import ThumbsUpLikes from '@/components/Likes/ThumbsUpLikes';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

const LikesTest = () => {
  const productId = 1383;
  const { data: productDetailData } = useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductDetail(productId),
  });
  const { data: reviewListData } = useQuery({
    queryKey: reviewKeys.list(productId),
    queryFn: () => getReviewList(productId),
  });

  return (
    <>
      <div>
        {productDetailData && (
          <HeartLikes favorite={productDetailData?.isFavorite} productId={productId} />
        )}
      </div>
      <div>
        {reviewListData && (
          <ThumbsUpLikes
            productId={productId}
            reviewId={reviewListData.list[0].id}
            liked={reviewListData.list[0].isLiked}
            likes={reviewListData.list[0].likeCount}
          />
        )}
      </div>
    </>
  );
};

export default LikesTest;
