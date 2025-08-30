import { baseAPI } from '@/lib/baseAPI';
import { Profile } from '@/types/api';

interface GetUserProfilePayload {
  userId: number;
}

export const getUserProfileAPI = async (payload: GetUserProfilePayload): Promise<Profile> => {
  const { userId } = payload;
  const res = await baseAPI.get(`/users/${userId}`);
  return res.data;
};
