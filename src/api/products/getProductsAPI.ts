import { baseAPI } from '@/lib/baseAPI';
import { ProductsList } from '@/types/api';

interface GetProductsParams {
  cursor?: number;
  order?: 'recent' | 'reviewCount' | 'rating';
  keyword?: string;
  category?: number;
}

export const getProductsAPI = async (params: GetProductsParams = {}): Promise<ProductsList> => {
  const { cursor, order = 'recent', keyword, category } = params;

  const queryParams = new URLSearchParams();
  if (cursor) queryParams.append('cursor', cursor.toString());
  queryParams.append('order', order);
  if (keyword) queryParams.append('keyword', keyword);
  if (category) queryParams.append('category', category.toString());

  const res = await baseAPI.get(`/products?${queryParams.toString()}`);
  return res.data;
};
