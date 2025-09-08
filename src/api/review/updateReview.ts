import { baseAPI } from '@/lib/baseAPI';

export interface UpdateReviewPayload {
  rating: number;
  content: string;
  images: { source: string }[];
}

export const updateReview = async (reviewId: number, payload: UpdateReviewPayload) => {
  const res = await baseAPI.patch(`/reviews/${reviewId}`, payload);
  return res.data;
};
