import { authAPI } from '@/lib/authAPI';
import { User } from '@/types/api';

export interface SignUpKakaoPayload {
  nickname: string;
  redirectUri: string;
  token: string;
}

export const signUpKakaoAPI = async (payload: SignUpKakaoPayload): Promise<User> => {
  const res = await authAPI.post('/api/oauth/kakao/signUp', payload);
  return res.data;
};
