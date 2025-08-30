import { baseAPI } from '@/lib/baseAPI';

export interface UpdateMyProfilePayload {
  description: string;
  nickname: string;
  image: string;
}

export interface UpdateMyProfileResponse {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export const updateMyProfileAPI = async (
  payload: UpdateMyProfilePayload,
): Promise<UpdateMyProfileResponse> => {
  const res = await baseAPI.patch('/users/me', payload);
  return res.data;
};
