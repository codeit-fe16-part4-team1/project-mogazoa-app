import { authAPI } from '@/lib/authAPI';
import { User } from '@/types/api';

export interface SignInPayload {
  email: string;
  password: string;
}

export const signInAPI = async (payload: SignInPayload): Promise<User> => {
  const res = await authAPI.post('/api/signIn', payload);
  return res.data;
};
