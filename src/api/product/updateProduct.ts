import { baseAPI } from '@/lib/baseAPI';

export interface UpdateProductPayload {
  categoryId: number;
  image: string;
  description: string;
  name: string;
}

export const updateProduct = async (productId: number, payload: UpdateProductPayload) => {
  const res = await baseAPI.patch(`/products/${productId}`, payload);
  return res.data;
};
