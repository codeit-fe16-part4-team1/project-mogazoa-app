import { baseAPI } from '@/lib/baseAPI';

export interface GetUserRankingResponse {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export const getUserRankingAPI = async (): Promise<GetUserRankingResponse[]> => {
  const res = await baseAPI.get('/users/ranking');
  return res.data;
};
