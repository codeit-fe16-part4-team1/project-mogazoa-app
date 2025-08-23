import { baseAPI } from '@/lib/baseAPI';
import { ProductsList } from '@/types/api';

export interface GetUserFollowPayload {
  userId: number;
  cursor?: number;
  type: 'followers' | 'followees';
}

export const getUserFollowsAPI = async ({
  userId,
  cursor,
  type,
}: GetUserFollowPayload): Promise<ProductsList> => {
  const res = await baseAPI.get(`/users/${userId}/${type}?cursor=${cursor}`);
  return res.data;
};
