import { baseAPI } from '@/lib/baseAPI';
import { ProductDetail } from '@/types/api';

export const removeFavoriteProduct = async (productId: number): Promise<ProductDetail> => {
  const res = await baseAPI.delete(`/products/${productId}/favorite`);
  return res.data;
};
