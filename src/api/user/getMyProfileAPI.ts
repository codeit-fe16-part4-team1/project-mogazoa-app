import { baseAPI } from '@/lib/baseAPI';
import { Profile } from '@/types/api';

export const getMyProfileAPI = async (): Promise<Profile> => {
  const res = await baseAPI.get('/users/me');
  return res.data;
};
