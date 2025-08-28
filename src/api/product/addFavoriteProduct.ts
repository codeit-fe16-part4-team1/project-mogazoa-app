import { baseAPI } from '@/lib/baseAPI';
import { ProductDetail } from '@/types/api';

export const addFavoriteProduct = async (productId: number): Promise<ProductDetail> => {
  const res = await baseAPI.post(`/products/${productId}/favorite`);
  return res.data;
};
