import { getUserProductsAPI, ProductType } from '@/api/user/getUserProductsAPI';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { productKeys } from '@/constant/queryKeys';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface Props {
  profileId: number;
  productType: ProductType;
}

const ProductList = ({ profileId, productType }: Props) => {
  const {
    data: products,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: productKeys.userProductList(profileId, productType),
    queryFn: ({ pageParam }) =>
      getUserProductsAPI({
        userId: profileId,
        type: productType,
        ...(pageParam && { cursor: pageParam }),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // select: (data) => data.pages.flatMap((page) => page.list),
  });

  const fetchObserverRef = useIntersectionObserver(fetchNextPage);

  const allProducts = products?.pages.flatMap((page) => page.list) || [];

  return (
    <article className='mx-auto grid max-w-235 grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3'>
      {allProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imgUrl={product.image}
          name={product.name}
          reviewCount={product.reviewCount}
          likeCount={product.favoriteCount}
          rating={product.rating}
        />
      ))}
      <div ref={fetchObserverRef}>{isFetchingNextPage ? '로딩 중...' : ''}</div>
    </article>
  );
};

export default ProductList;
