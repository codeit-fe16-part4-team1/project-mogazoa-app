import { baseAPI } from '@/lib/baseAPI';
import { Profile } from '@/types/api';

interface UserUnFollowPayload {
  userId: number;
}

export const userUnFollowAPI = async (payload: UserUnFollowPayload): Promise<Profile> => {
  const { userId } = payload;
  const res = await baseAPI.delete(`/follow`, {
    data: { userId },
  });
  return res.data;
};
