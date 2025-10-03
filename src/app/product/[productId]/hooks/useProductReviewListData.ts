import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getReviewList } from '@/api/product/getReviewList';
import { reviewKeys } from '@/constant/queryKeys';
import { OrderOptions } from '@/types/api';

export const useProductReviewListData = (productId: number, order: OrderOptions) => {
  return useSuspenseInfiniteQuery({
    queryKey: reviewKeys.list(productId, order),
    queryFn: ({ pageParam }) => getReviewList({ productId, order, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data.pages.flatMap((page) => page.list),
  });
};
