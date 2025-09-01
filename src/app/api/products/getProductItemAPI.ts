import { baseAPI } from '@/lib/baseAPI';
import { ProductItem } from '@/types/api';

interface GetProductItemParams {
  productId: number;
}

export const getProductItemAPI = async (params: GetProductItemParams): Promise<ProductItem> => {
  const { productId } = params;
  const res = await baseAPI.get(`/products/${productId}`);
  return res.data;
};
