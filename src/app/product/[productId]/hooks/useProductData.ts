import { useSuspenseQuery } from '@tanstack/react-query';

import { getProductDetail } from '@/api/product/getProductDetail';
import { productKeys } from '@/constant/queryKeys';

export const useProductData = (productId: number) => {
  return useSuspenseQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductDetail(productId),
  });
};
