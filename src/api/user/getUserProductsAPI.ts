import { baseAPI } from '@/lib/baseAPI';
import { ProductsList } from '@/types/api';

export type ProductType = keyof typeof TYPE_MAP;

export interface GetUserProductsPayload {
  userId: number;
  cursor?: number;
  type: ProductType;
}

const TYPE_MAP = {
  created: 'created-products',
  reviewed: 'reviewed-products',
  favorite: 'favorite-products',
} as const;

export const getUserProductsAPI = async ({
  userId,
  cursor,
  type,
}: GetUserProductsPayload): Promise<ProductsList> => {
  const cursorQuery = cursor ? `?cursor=${cursor}` : '';
  const res = await baseAPI.get(`/users/${userId}/${TYPE_MAP[type]}${cursorQuery}`);
  return res.data;
};
