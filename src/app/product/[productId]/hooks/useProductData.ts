import { getProductDetail } from '@/api/product/getProductDetail';
import { productKeys } from '@/constant/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useProductData = (productId: number) => {
  return useSuspenseQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductDetail(productId),
  });
};
