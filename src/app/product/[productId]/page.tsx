import { getProductDetail } from '@/api/product/getProductDetail';
import { getReviewList } from '@/api/product/getReviewList';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import ProductDetailPage from './ProductDetailPage';
import { getUserInfo } from '@/lib/getUserInfo';

const ProductDetailPageServer = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId: slug } = await params;
  const productId = Number(slug);
  const order = 'recent';
  const { userId } = await getUserInfo();
  const queryClient = new QueryClient();

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
      <ProductDetailPage productId={productId} order={order} userId={userId} />
    </HydrationBoundary>
  );
};

export default ProductDetailPageServer;
