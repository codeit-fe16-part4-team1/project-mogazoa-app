import { baseAPI } from '@/lib/baseAPI';
import { Profile } from '@/types/api';

interface UserFollowPayload {
  userId: number;
}

export const userFollowAPI = async (payload: UserFollowPayload): Promise<Profile> => {
  const { userId } = payload;
  const res = await baseAPI.post(`/follow`, {
    userId,
  });
  return res.data;
};
