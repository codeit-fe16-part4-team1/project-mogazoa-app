import { Follows } from '@/api/user/getUserFollowsAPI';
import { ProductType } from '@/api/user/getUserProductsAPI';
import { OrderOptions } from '@/types/api';

export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
  detail: (productId: number) => [...productKeys.all, productId] as const,
  userProductList: (userId: number, type: ProductType) =>
    [...productKeys.all, 'user', userId, type] as const,
};

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (productId: number, order: OrderOptions) =>
    [...reviewKeys.all, 'by-product', productId, order] as const,
};

export const profileKeys = {
  all: ['profile'] as const,
  detail: (profileId: number) => [...profileKeys.all, profileId],
  follows: (profileId: number, type: Follows) => [...profileKeys.all, profileId, type],
};
