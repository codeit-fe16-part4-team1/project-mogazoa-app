import { baseAPI } from '@/lib/baseAPI';
import { ProductDetail } from '@/types/api';

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const res = await baseAPI.get(`/products/${productId}`);
  return res.data;
};
