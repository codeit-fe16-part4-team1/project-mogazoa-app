import { baseAPI } from '@/lib/baseAPI';

export const removeReview = async (reviewId: number) => {
  const res = await baseAPI.delete(`/reviews/${reviewId}`);
  return res.data;
};
