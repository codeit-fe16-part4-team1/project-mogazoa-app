import { baseAPI } from '@/lib/baseAPI';
import { Category } from '@/types/api';

export const getCategories = async (): Promise<Category[]> => {
  const res = await baseAPI.get('/categories');
  return res.data;
};
