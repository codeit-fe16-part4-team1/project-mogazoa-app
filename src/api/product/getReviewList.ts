import { baseAPI } from '@/lib/baseAPI';
import { OrderOptions, ReviewList } from '@/types/api';

export const getReviewList = async (
  productId: number,
  order?: OrderOptions,
  cursor?: number,
): Promise<ReviewList> => {
  const res = await baseAPI.get(`/products/${productId}/reviews`, {
    params: {
      order,
      cursor,
    },
  });
  return res.data;
};
