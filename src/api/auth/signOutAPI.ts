import { authAPI } from '@/lib/authAPI';

export const signOutAPI = async (): Promise<void> => {
  await authAPI.post('/api/signOut');
};
