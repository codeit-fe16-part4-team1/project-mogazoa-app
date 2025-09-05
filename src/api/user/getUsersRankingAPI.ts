import { baseAPI } from '@/lib/baseAPI';
import { UserRanking } from '@/types/api';

export const getUsersRankingAPI = async (): Promise<UserRanking[]> => {
  const res = await baseAPI.get('/users/ranking');
  return res.data;
};
