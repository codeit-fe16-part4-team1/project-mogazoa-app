import { baseAPI } from '@/lib/baseAPI';
import { Review } from '@/types/api';

export const removeLikeReview = async (reviewId: number): Promise<Review> => {
  const res = await baseAPI.delete(`/reviews/${reviewId}/like`);

  return res.data;
};
