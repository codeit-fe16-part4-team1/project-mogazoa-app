import { authAPI } from '@/lib/authAPI';
import { User } from '@/types/api';

export interface SignInKakaoPayload {
  redirectUri: string;
  token: string;
}

export const signInKakaoAPI = async (payload: SignInKakaoPayload): Promise<User> => {
  const res = await authAPI.post('/api/oauth/kakao/signIn', payload);
  return res.data;
};
