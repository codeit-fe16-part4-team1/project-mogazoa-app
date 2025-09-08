import { baseAPI } from '@/lib/baseAPI';

export interface CreateProductPayload {
  categoryId: number;
  image: string;
  description: string;
  name: string;
}

export const createProduct = async (payload: CreateProductPayload) => {
  const res = await baseAPI.post('/products', payload);
  return res.data;
};
