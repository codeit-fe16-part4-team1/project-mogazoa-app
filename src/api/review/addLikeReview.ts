import { baseAPI } from '@/lib/baseAPI';
import { Review } from '@/types/api';

export const addLikeReview = async (reviewId: number): Promise<Review> => {
  const res = await baseAPI.post(`/reviews/${reviewId}/like`);
  return res.data;
};
