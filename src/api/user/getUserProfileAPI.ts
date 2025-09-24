import { baseAPI } from '@/lib/baseAPI';
import { Profile } from '@/types/api';
import { notFound } from 'next/navigation';

interface GetUserProfilePayload {
  userId: number;
}

export const getUserProfileAPI = async (payload: GetUserProfilePayload): Promise<Profile> => {
  const { userId } = payload;
  if (isNaN(userId)) {
    notFound();
  }
  const res = await baseAPI.get(`/users/${userId}`);
  return res.data;
};
