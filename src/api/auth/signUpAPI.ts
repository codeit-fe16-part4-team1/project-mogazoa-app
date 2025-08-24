import { authAPI } from '@/lib/authAPI';
import { User } from '@/types/api';

export interface SignUpPayload {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const signUpAPI = async (payload: SignUpPayload): Promise<User> => {
  const res = await authAPI.post('/api/signUp', payload);
  return res.data;
};
