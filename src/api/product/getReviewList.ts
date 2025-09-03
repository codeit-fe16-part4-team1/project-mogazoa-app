import { baseAPI } from '@/lib/baseAPI';
import { OrderOptions, ReviewListResponse } from '@/types/api';

export const getReviewList = async ({
  productId,
  order,
  cursor,
}: {
  productId: number;
  order?: OrderOptions;
  cursor?: number;
}): Promise<ReviewListResponse> => {
  const res = await baseAPI.get(`/products/${productId}/reviews`, {
    params: {
      order,
      cursor,
    },
  });
  return res.data;
};
