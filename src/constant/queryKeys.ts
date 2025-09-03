import { OrderOptions } from '@/types/api';
import { ProductType } from '@/api/user/getUserProductsAPI';

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
};
