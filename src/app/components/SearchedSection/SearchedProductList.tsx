import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getProductsAPI } from '@/api/products/getProductsAPI';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import GridLayout from '../GridLayout';
import { ORDER_BY } from '../SearchedSection';

interface Props {
  categoryId: number;
  orderBy: ORDER_BY;
  searchKeyword: string;
}

const SearchedProductList = ({ categoryId, orderBy, searchKeyword }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['products', 'search', searchKeyword, categoryId, orderBy],
    queryFn: ({ pageParam }) =>
      getProductsAPI({
        cursor: pageParam,
        keyword: searchKeyword,
        category: categoryId,
        order: orderBy,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const fetchObserverRef = useIntersectionObserver(fetchNextPage);

  const products = data?.pages.flatMap((page) => page.list) || [];

  return (
    <div>
      <GridLayout>
        {products.map((product) => (
          <ProductCard key={product.id} productItem={product} />
        ))}
      </GridLayout>

      <div ref={fetchObserverRef} className='text-center'>
        {isFetchingNextPage ? '로딩 중...' : ''}
      </div>
    </div>
  );
};

export default SearchedProductList;
