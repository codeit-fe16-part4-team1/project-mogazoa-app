import { getProductDetail } from '@/api/product/getProductDetail';
import { getReviewList } from '@/api/product/getReviewList';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import ProductDetailPage from './ProductDetailPage';

const ProductDetailPageServer = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId: slug } = await params;
  const productId = Number(slug);

  const queryClient = new QueryClient();
  const order = 'recent';

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(productId),
      queryFn: () => getProductDetail(productId),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: reviewKeys.list(productId, order),
      queryFn: ({ pageParam }) => getReviewList({ productId, cursor: pageParam }),
      initialPageParam: 0,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage productId={productId} order={order} />
    </HydrationBoundary>
  );
};

export default ProductDetailPageServer;
