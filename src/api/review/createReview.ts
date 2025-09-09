import { baseAPI } from '@/lib/baseAPI';

export interface CreateReviewPayload {
  productId: number;
  rating: number;
  content: string;
  images: string[];
}

export const createReview = async (payload: CreateReviewPayload) => {
  const res = await baseAPI.post('/reviews', payload);
  return res.data;
};
